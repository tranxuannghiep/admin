import "./FilterUser.scss";
import { Button, Col, Collapse, Form, Row } from "react-bootstrap";
import {
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { useFormik } from "formik";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { changeFilterUser } from "modules/adminUser/redux/mangeUserReducer";

export interface FilterUserProps {}
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

export default function FilterUser(props: FilterUserProps) {
  const { administrator, customer } = useSelector(
    (state: RootState) => state.roleListReducer
  );
  const { country } = useSelector(
    (state: RootState) => state.countryListReducer
  );
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [stateList, setStateList] = useState<any>([]);
  const [dateRange, setDateRange] = useState<(Date | null)[]>([null, null]);
  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <input
      className="form-control"
      onClick={onClick}
      ref={ref}
      readOnly
      value={dateRange[1] ? value : value.slice(0, -3)}
      placeholder="Enter date range"
    />
  ));
  const formik = useFormik({
    initialValues: {
      search: "",
      memberships: [],
      types: [],
      status: [],
      country: "",
      state: "",
      address: "",
      phone: "",
      date_type: "R",
      date_range: [],
    },
    onSubmit: (values) => {
      dispatch(changeFilterUser(values));
    },
  });
  return (
    <div id="FilterUser">
      <h2 className="search-title">Search for users</h2>
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
                input={<OutlinedInput label={false} />}
                fullWidth
                size="small"
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return "All memberships";
                  }
                  return selected.map((val) => "General").join(", ");
                }}
                multiple
                name="memberships"
                value={formik.values.memberships}
                onChange={formik.handleChange}
                displayEmpty
                MenuProps={MenuProps}
              >
                <ListSubheader>Memberships</ListSubheader>
                <MenuItem value="M_4">
                  <Checkbox
                    checked={(formik.values.memberships as string[]).includes(
                      "M_4"
                    )}
                  />
                  <ListItemText primary="General" />
                </MenuItem>

                <ListSubheader>Pending Memberships</ListSubheader>
                <MenuItem value="P_4">
                  <Checkbox
                    checked={(formik.values.memberships as string[]).includes(
                      "P_4"
                    )}
                  />
                  <ListItemText primary="General" />
                </MenuItem>
              </Select>
            </li>
            <li className="categoryId-condition">
              <Select
                input={<OutlinedInput label={false} />}
                fullWidth
                size="small"
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return "All user types";
                  }
                  const values = selected.map((val) => {
                    const idxA = administrator.findIndex((v) => v.id === val);
                    if (idxA !== -1) return administrator[idxA].name;
                    else {
                      const idxC = customer.findIndex((v) => v.id === val);
                      return customer[idxC].name;
                    }
                  });
                  return values.join(", ");
                }}
                multiple
                name="types"
                value={formik.values.types}
                onChange={formik.handleChange}
                displayEmpty
                MenuProps={MenuProps}
              >
                <ListSubheader>Memberships</ListSubheader>
                {administrator.map((val) => (
                  <MenuItem key={val.id} value={val.id}>
                    <Checkbox
                      checked={(formik.values.types as string[]).includes(
                        val.id
                      )}
                    />
                    <ListItemText primary={val.name} />
                  </MenuItem>
                ))}

                <ListSubheader>Pending Memberships</ListSubheader>
                {customer.map((val) => (
                  <MenuItem key={val.id} value={val.id}>
                    <Checkbox
                      checked={(formik.values.types as string[]).includes(
                        val.id
                      )}
                    />
                    <ListItemText primary={val.name} />
                  </MenuItem>
                ))}
              </Select>
            </li>
            <li className="inventory-condition">
              <Select
                fullWidth
                size="small"
                value={formik.values.status}
                name="status"
                onChange={(e) => {
                  if (Boolean(e.target.value))
                    formik.setFieldValue("status", [`${e.target.value}`]);
                  else {
                    formik.setFieldValue("status", []);
                  }
                }}
                displayEmpty
                MenuProps={MenuProps}
                label={false}
              >
                <MenuItem value="">Any status</MenuItem>
                <MenuItem value="E">Enable</MenuItem>
                <MenuItem value="D">Disable</MenuItem>
                <MenuItem value="U">Unapproved vendor</MenuItem>
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
            <div className="search-conditions-hidden">
              <Row className=" pb-3 pt-3">
                <Col sm={4} className="ms-3 me-5">
                  <Row className="align-items-center">
                    <Col sm={3}>Country</Col>
                    <Col sm={9}>
                      <Select
                        MenuProps={MenuProps}
                        label={false}
                        fullWidth
                        displayEmpty
                        size="small"
                        name="country"
                        value={formik.values.country}
                        onChange={async (e) => {
                          formik.handleChange(e);
                          formik.setFieldValue("state", "");
                          if (e.target.value === "") {
                            setStateList([]);
                            return;
                          }
                          const json = await dispatch(
                            fetchThunk(API_PATHS.getState, "post", {
                              code: e.target.value,
                            })
                          );
                          if (json.success) {
                            setStateList(json.data);
                          }
                        }}
                      >
                        <MenuItem value="">Select country</MenuItem>
                        {country.map((val) => (
                          <MenuItem key={val.id} value={val.code}>
                            {val.country}
                          </MenuItem>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-3">
                    <Col sm={3}>State</Col>
                    <Col sm={9}>
                      {!!stateList.length ? (
                        <Select
                          MenuProps={MenuProps}
                          label={false}
                          fullWidth
                          displayEmpty
                          size="small"
                          name="state"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                        >
                          {stateList.map((val: any) => (
                            <MenuItem key={val.state_id} value={val.state}>
                              {val.state}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <Form.Control
                          className="me-auto"
                          name="state"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-3">
                    <Col sm={3}>Address</Col>
                    <Col sm={9}>
                      <Form.Control
                        className="me-auto"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-3">
                    <Col sm={3}>Phone</Col>
                    <Col sm={9}>
                      <Form.Control
                        className="me-auto"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm={5}>
                  <Row>
                    <Col sm={3}>User activity</Col>
                    <Col sm={9}>
                      <div className="mb-3">
                        <Form.Check
                          inline
                          name="date_type"
                          type="radio"
                          label="Register"
                          checked={formik.values.date_type === "R"}
                          onChange={() =>
                            formik.setFieldValue("date_type", "R")
                          }
                        />
                        <Form.Check
                          inline
                          name="date_type"
                          type="radio"
                          label="Last logged in"
                          checked={formik.values.date_type === "L"}
                          onChange={() =>
                            formik.setFieldValue("date_type", "L")
                          }
                        />
                      </div>
                      <DatePicker
                        selectsRange
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={(value) => {
                          formik.setFieldValue("date_range", [
                            `${new Date(value[0] as Date).toLocaleDateString(
                              "en-CA"
                            )}`,
                            `${new Date(
                              value[1] ? (value[1] as Date) : Date.now()
                            ).toLocaleDateString("en-CA")}`,
                          ]);

                          setDateRange(value);
                        }}
                        dateFormat="MMM d, yyyy"
                        customInput={<ExampleCustomInput />}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Collapse>
        </div>
      </form>
    </div>
  );
}
