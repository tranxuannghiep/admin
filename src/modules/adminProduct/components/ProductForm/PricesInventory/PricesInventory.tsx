import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { FastField, FormikProps } from "formik";
import { CreateProduct } from "models/products";
import { BsCurrencyDollar, BsFillCalendarFill } from "react-icons/bs";
import { formatPrice } from "utils/formatInputPrice";
import DatePicker from "react-datepicker";

export interface PricesInventoryProps {
  form: FormikProps<CreateProduct>;
}

export default function PricesInventory({
  form: formik,
}: PricesInventoryProps) {
  return (
    <>
      <h6 className="label-title">Prices & Inventory</h6>
      <div className="row mb-4">
        <label className="col-sm-2">Memberships</label>
        <div className="col-sm-4">
          <FastField
            name="memberships"
            as={Select}
            input={<OutlinedInput label={false} />}
            fullWidth
            size="small"
            renderValue={(selected: any) => {
              if (selected.length === 0) return "";
              return "General";
            }}
            multiple
          >
            <MenuItem value="4">
              <Checkbox
                checked={(formik.values.memberships as string[]).includes("4")}
              />
              <ListItemText primary="General" />
            </MenuItem>
          </FastField>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-2">Tax class</label>
        <div className="col-sm-2">Default</div>
        <div className="col-sm-2">
          <FastField
            type="checkbox"
            name="tax_exempt"
            checked={Boolean(Number(formik.values.tax_exempt))}
            onChange={(e: any) =>
              formik.setFieldValue(
                "tax_exempt",
                Number(e.target.checked).toString()
              )
            }
          />
          <span>Tax Exempt</span>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-2">Price *</label>
        <div className="col-sm-2">
          <div className="bg-dollar d-flex align-items-center">
            <div className="icon-dollar">
              <BsCurrencyDollar />
            </div>
            <FastField
              className="form-control"
              name="price"
              type="text"
              placeholder="0.00"
              value={formatPrice(formik.values.price)}
              onChange={(e: any) => {
                if (formatPrice(e.target.value)) {
                  formik.setFieldValue("price", formatPrice(e.target.value));
                }
              }}
            />
          </div>
          <small>{formik.touched.price && formik.errors.price}</small>
        </div>
        <div className="col-sm-1">
          <FastField
            name="participate_sale"
            type="checkbox"
            checked={Boolean(Number(formik.values.participate_sale))}
            onChange={(e: any) =>
              formik.setFieldValue(
                "participate_sale",
                Number(e.target.checked).toString()
              )
            }
          />
          <span>Sale</span>
        </div>
        {formik.values.participate_sale === "1" && (
          <div className="col-sm-3">
            <div className="d-flex">
              <FastField
                name="sale_price_type"
                as={Select}
                fullWidth
                size="small"
                displayEmpty
                label={false}
                sx={{ maxWidth: "80px" }}
              >
                <MenuItem value="$">$</MenuItem>
                <MenuItem value="%">%</MenuItem>
              </FastField>

              <FastField
                type="text"
                className="form-control"
                name="sale_price"
                value={formatPrice(formik.values.sale_price)}
                onChange={(e: any) => {
                  if (formatPrice(e.target.value)) {
                    formik.setFieldValue(
                      "sale_price",
                      formatPrice(e.target.value)
                    );
                  }
                }}
              />
            </div>
            <small>
              {formik.touched.sale_price && formik.errors.sale_price}
            </small>
          </div>
        )}
      </div>
      <div className="row mb-4">
        <label className="col-sm-2">Arrival date</label>
        <div className="col-sm-4">
          <div className="bg-dollar d-flex align-items-center">
            <div className="icon-dollar">
              <BsFillCalendarFill />
            </div>
            <FastField
              component={DatePicker}
              dateFormat="yyyy-MM-dd"
              selected={
                new Date(
                  Number.isInteger(+formik.values.arrival_date)
                    ? Number(formik.values.arrival_date)
                    : formik.values.arrival_date
                )
              }
              onChange={(date: any) => {
                formik.setFieldValue(
                  "arrival_date",
                  new Date(date.toString()).toLocaleString("en-CA", {
                    year: "numeric",
                    day: "2-digit",
                    month: "2-digit",
                  })
                );
              }}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <label className="col-sm-2">Quantity in stock *</label>
        <div className="col-sm-2">
          <FastField
            type="number"
            className="form-control"
            name="quantity"
            value={formik.values.quantity}
            onChange={(e: any) => {
              const regex = /[0-9]/;
              if (!regex.test(e.target.value)) return;
              formik.setFieldValue("quantity", e.target.value);
            }}
          />
          <small>{formik.touched.quantity && formik.errors.quantity}</small>
        </div>
      </div>
    </>
  );
}
