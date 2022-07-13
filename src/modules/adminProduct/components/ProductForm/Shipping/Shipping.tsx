import { MenuItem, Select } from "@mui/material";
import { ErrorMessage, FastField, FormikProps } from "formik";
import { CreateProduct } from "models/products";
import { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { formatPrice } from "utils/formatInputPrice";
import { MenuProps } from "modules/adminProduct/utils/MakeStyle";

const getName = (arr: any, id: string) => {
  const idx = arr.findIndex((v: any) => v.id === id);
  if (id === "1") return "Continental U.S. *";
  return arr[idx].name;
};
export interface ShippingProps {
  form: FormikProps<CreateProduct>;
}
export default function Shipping({ form: formik }: ShippingProps) {
  const { shippingList } = useSelector(
    (state: RootState) => state.shippingListReducer
  );
  const [idCountry, setIdCountry] = useState("");
  const [countryList, setCountryList] = useState(shippingList);
  useEffect(() => {
    setCountryList(shippingList);
  }, [shippingList]);
  return (
    <>
      <h6 className="label-title">Shipping</h6>
      {formik.values.shipping_to_zones.map((val, index) => (
        <div key={val.id} className="row mb-4">
          <label className="col-sm-2">{getName(shippingList, val.id)}</label>
          <div className={val.id === "1" ? "col-sm-4" : "col-sm-3"}>
            <div className="bg-dollar d-flex align-items-center">
              <div className="icon-dollar">
                <BsCurrencyDollar />
              </div>
              <FastField
                name="shipping_to_zones"
                type="text"
                className="form-control"
                placeholder="0.00"
                value={formatPrice(val.price)}
                onChange={(e: any) => {
                  if (formatPrice(e.target.value)) {
                    formik.setFieldValue("shipping_to_zones", [
                      ...formik.values.shipping_to_zones.slice(0, index),
                      { id: val.id, price: formatPrice(e.target.value) },
                      ...formik.values.shipping_to_zones.slice(index + 1),
                    ]);
                  }
                }}
              />
            </div>
            <small>
              <ErrorMessage name={`shipping_to_zones.${index}.price`} />
            </small>
          </div>
          {val.id !== "1" && (
            <div
              className="col-sm-1 cs-pointer"
              onClick={() =>
                formik.setFieldValue("shipping_to_zones", [
                  ...formik.values.shipping_to_zones.slice(0, index),
                  ...formik.values.shipping_to_zones.slice(index + 1),
                ])
              }
            >
              Remove
            </div>
          )}
        </div>
      ))}
      {countryList.length > 0 && (
        <div className="row mb-4">
          <label className="col-sm-2"></label>
          <div className="col-sm-3">
            <FastField
              as={Select}
              name="shipping_to_zones"
              fullWidth
              size="small"
              displayEmpty
              MenuProps={MenuProps}
              label={false}
              value={idCountry}
              onChange={(e: any) => {
                formik.setFieldValue("shipping_to_zones", [
                  ...formik.values.shipping_to_zones,
                ]);
                setIdCountry(e.target.value);
              }}
            >
              {countryList
                .filter(
                  (value) =>
                    formik.values.shipping_to_zones.findIndex(
                      (v) => v.id === value.id
                    ) === -1
                )
                .map((val) => (
                  <MenuItem key={val.id} value={val.id || ""}>
                    {val.name}
                  </MenuItem>
                ))}
            </FastField>
          </div>
          <div
            className="col-sm-3 cs-pointer"
            onClick={() => {
              if (idCountry !== "") {
                formik.setFieldValue("shipping_to_zones", [
                  ...formik.values.shipping_to_zones,
                  { id: idCountry, price: "0" },
                ]);
              }
              setIdCountry("");
            }}
          >
            Add Shipping Location
          </div>
        </div>
      )}
    </>
  );
}
