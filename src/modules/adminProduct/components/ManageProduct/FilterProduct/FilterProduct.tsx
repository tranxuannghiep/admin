import "./FilterProduct.scss";
import { Button, Collapse, Form } from "react-bootstrap";
import {
  Autocomplete,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useCallback, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import { changeFilterProduct } from "modules/adminProduct/redux/manageProductReducer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      marginTop: 8,
    },
  },
};
export interface FilterProductProps {}

export default function FilterProduct(props: FilterProductProps) {
  const { categoryList } = useSelector(
    (state: RootState) => state.categoryListReducer
  );
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(
    async (search: string) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.getVendorList, "post", { search: search })
      );
      if (json.recordsTotal > 0) {
        setOptions(json.data);
      } else {
        setOptions([]);
      }
      setLoading(false);
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      search: "",
      category: "0",
      stock_status: "all",
      search_type: "",
      availability: "all",
      vendor: "",
    },
    onSubmit: (values) => {
      const valuesSubmit = {
        ...values,
        search_type: formik.values.search_type.toString(),
      };
      dispatch(changeFilterProduct(valuesSubmit));
    },
  });
  return (
    <div id="FilterProduct">
      <h2 className="search-title">Products</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="search-conditions-box">
          <ul className="search-conditions">
            <li className="substring-condition">
              <Form.Control
                className="me-auto"
                placeholder="Search keywords"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
              />
            </li>
            <li className="categoryId-condition">
              <Select
                fullWidth
                size="small"
                value={formik.values.category}
                name="category"
                onChange={formik.handleChange}
                displayEmpty
                MenuProps={MenuProps}
                label={false}
              >
                <MenuItem value="0">Any category</MenuItem>
                {categoryList.map((val) => (
                  <MenuItem
                    sx={{ maxWidth: "300px" }}
                    key={val.id}
                    value={val.id}
                  >
                    {val.name}
                  </MenuItem>
                ))}
              </Select>
            </li>
            <li className="categoryId-condition">
              <Select
                fullWidth
                size="small"
                value={formik.values.stock_status}
                name="stock_status"
                onChange={formik.handleChange}
                displayEmpty
                MenuProps={MenuProps}
                label={false}
              >
                <MenuItem value="all">Any stock status</MenuItem>
                <MenuItem value="in">In stock</MenuItem>
                <MenuItem value="low">Low stock</MenuItem>
                <MenuItem value="out">SOLD</MenuItem>
              </Select>
            </li>

            <li className="actions">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </li>
          </ul>
          <div
            aria-expanded={openCollapse}
            className="arrow"
            onClick={() => setOpenCollapse(!openCollapse)}
          ></div>
          <Collapse in={openCollapse}>
            <div>
              <ul className="search-conditions-hidden d-flex align-items-start">
                <li className="by_conditions-condition d-flex mt-3">
                  <label>Search in:</label>
                  <ul className="by-conditions">
                    <li>
                      <input
                        type="checkbox"
                        name="search_type"
                        value="name"
                        onChange={formik.handleChange}
                      />
                      <label>Name</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="search_type"
                        value="sku"
                        onChange={formik.handleChange}
                      />
                      <label>SKU</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        name="search_type"
                        value="description"
                        onChange={formik.handleChange}
                      />
                      <label>Full Description</label>
                    </li>
                  </ul>
                </li>
                <li className="availability-condition d-flex align-items-center mt-3">
                  <label>Availability</label>
                  <Select
                    fullWidth
                    size="small"
                    displayEmpty
                    name="availability"
                    value={formik.values.availability}
                    onChange={formik.handleChange}
                    MenuProps={MenuProps}
                    label={false}
                  >
                    <MenuItem value="all">Any availability status</MenuItem>
                    <MenuItem value="1">Only enabled</MenuItem>
                    <MenuItem value="0">Only disabled</MenuItem>
                  </Select>
                </li>
                <li className="inventory-condition d-flex align-items-center mt-3">
                  <label>Vendor</label>
                  <Autocomplete
                    size="small"
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    freeSolo
                    disableClearable
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        name="vendor"
                        {...params}
                        label={false}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    onChange={(_, value) => {
                      formik.setFieldValue("vendor", value.id);
                    }}
                    onInput={(e: any) => {
                      formik.handleChange(e);
                      if (e.target.value.length <= 1) {
                        setOptions([]);
                        return;
                      }
                      setTimeout(() => {
                        getData(e.target.value);
                      }, 1000);
                    }}
                    renderOption={(props, option, { inputValue }) => {
                      const matches = match(option.name, inputValue, {
                        insideWords: true,
                      });
                      const parts = parse(option.name, matches);

                      return (
                        <li key={option.id} {...props}>
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                  color: part.highlight ? "red" : "white",
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </div>
                        </li>
                      );
                    }}
                  />
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
      </form>
    </div>
  );
}
