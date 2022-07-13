import {
  Autocomplete,
  AutocompleteRenderInputParams,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ErrorMessage, FastField, FieldProps, FormikProps } from "formik";
import JoditEditor from "jodit-react";
import { CreateProduct } from "models/products";
import {
  MenuProps,
  useStylesSwitch,
} from "modules/adminProduct/utils/MakeStyle";
import { forwardRef } from "react";

import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import ImageForm from "../ImageForm/ImageForm";

const getValue = (vendorList: any[], id: string) => {
  const idx = vendorList.findIndex((val) => val.id === id);
  return {
    id: id,
    name: vendorList[idx]?.name || "",
  };
};

export interface AddProductFormProps {
  form: FormikProps<CreateProduct>;
}

function AddProductForm({ form: formik }: AddProductFormProps, refDesc: any) {
  const { categoryList } = useSelector(
    (state: RootState) => state.categoryListReducer
  );
  const { brandList } = useSelector(
    (state: RootState) => state.brandListReducer
  );
  const { vendorList } = useSelector(
    (state: RootState) => state.vendorListReducer
  );

  const classes = useStylesSwitch();
  return (
    <>
      {vendorList.length > 0 && (
        <div className="row mb-4">
          <label className="col-sm-2">Vendor *</label>
          <div className="col-sm-4">
            <FastField
              name="vendor_id"
              component={Autocomplete}
              options={vendorList}
              size="small"
              disableClearable
              getOptionLabel={(option: any) => option.name}
              isOptionEqualToValue={(option: any, value: any) =>
                option.id === value.id
              }
              onChange={(_: any, value: any) => {
                formik.setFieldValue("vendor_id", value.id);
              }}
              value={getValue(vendorList, formik.values.vendor_id)}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField {...params} label={false} />
              )}
            />
            <small>{formik.touched.vendor_id && formik.errors.vendor_id}</small>
          </div>
        </div>
      )}

      <div className="row mb-4">
        <label className="col-sm-2">Product Title *</label>
        <div className="col-sm-4">
          <FastField className="form-control" name="name" />
          <small>{formik.touched.name && formik.errors.name}</small>
        </div>
      </div>
      {brandList.length && (
        <div className="row mb-4">
          <label className="col-sm-2">Brand *</label>
          <div className="col-sm-4">
            <FastField
              name="brand_id"
              as={Select}
              fullWidth
              size="small"
              displayEmpty
              label={false}
              MenuProps={MenuProps}
            >
              {brandList
                .filter((value) => value.id !== null)
                .map((val: any) => (
                  <MenuItem key={val.id} value={val.id}>
                    {val.name}
                  </MenuItem>
                ))}
            </FastField>
            <small>{formik.touched.brand_id && formik.errors.brand_id}</small>
          </div>
        </div>
      )}

      <div className="row mb-4">
        <label className="col-sm-2">Condition *</label>
        <div className="col-sm-4">
          <FastField
            name="condition_id"
            as={Select}
            fullWidth
            size="small"
            displayEmpty
            label={false}
          >
            <MenuItem value="292">Used</MenuItem>
          </FastField>
          <small>
            {formik.touched.condition_id && formik.errors.condition_id}
          </small>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-2">SKU</label>
        <div className="col-sm-4">
          <FastField className="form-control" name="sku" />
        </div>
      </div>
      <ImageForm form={formik} />
      {categoryList.length > 0 && (
        <div className="row mb-4">
          <label className="col-sm-2">Category *</label>
          <div className="col-sm-8">
            <FastField
              name="categories"
              component={Autocomplete}
              size="small"
              disableClearable
              multiple
              options={categoryList}
              getOptionLabel={(option: any) => option.name}
              isOptionEqualToValue={(option: any, value: any) =>
                option.id === value.id
              }
              value={formik.values.categories}
              renderInput={(params: any) => (
                <TextField name="categories" {...params} label={false} />
              )}
              onChange={(_: any, value: any) => {
                formik.setFieldValue(
                  "categories",
                  value.map((val: any) => ({ id: val.id, name: val.name }))
                );
              }}
            />
            <small>
              <ErrorMessage name="categories" />
            </small>
          </div>
        </div>
      )}

      <div className="row mb-4">
        <label className="col-sm-2">Description *</label>
        <div className="col-sm-8">
          <FastField name="description">
            {({ field }: FieldProps) => (
              <JoditEditor
                {...field}
                config={{
                  buttons: ["bold", "italic", "ul", "ol", "source"],
                }}
                ref={refDesc}
                value={formik.values.description}
              />
            )}
          </FastField>
          <small>
            {formik.touched.description && formik.errors.description}
          </small>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-2">Available for sale</label>
        <div className="col-sm-8">
          <FastField
            component={Switch}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            checked={Boolean(Number(formik.values.enabled))}
            onChange={(e: any) =>
              formik.setFieldValue(
                "enabled",
                Number(e.target.checked).toString()
              )
            }
          />
        </div>
      </div>
    </>
  );
}

export default forwardRef(AddProductForm);
