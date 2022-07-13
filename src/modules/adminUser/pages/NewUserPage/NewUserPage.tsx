import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./NewUserPage.scss";
import { useFormik } from "formik";
import { validationNewUserSchema } from "utils/validate.util";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import { useState } from "react";
import Loading from "components/Loading/Loading";
import { useSnackbar } from "notistack";
export interface NewUserPageProps {}

export default function NewUserPage(props: NewUserPageProps) {
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const { administrator } = useSelector(
    (state: RootState) => state.roleListReducer
  );
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
      paymentRailsType: "individual",
      access_level: "10",
      roles: ["1"],
      membership_id: "",
      forceChangePassword: 0,
      taxExempt: 0,
    },
    validationSchema: validationNewUserSchema,
    onSubmit: async (values) => {
      if (values.access_level === "10") values.roles = [];
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.createUser, "post", values)
      );
      setLoading(false);
      if (json.success) {
        enqueueSnackbar("Create successfully", { variant: "success" });
        navigate(ROUTES.manageUser);
      } else {
        enqueueSnackbar(json.errors, { variant: "error" });
      }
    },
  });
  return (
    <div id="NewUserPage">
      {loading && <Loading />}
      <div
        className="back-to-prev d-flex align-items-center justify-content-center mb-2"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft />
      </div>
      <h4 className="title">Create profile</h4>
      <form onSubmit={formik.handleSubmit}>
        <h6 className="label-title">Email & password</h6>
        <div className="row mb-4">
          <label className="col-sm-3">First Name *</label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <small>{formik.touched.firstName && formik.errors.firstName}</small>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Last Name *</label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <small>{formik.touched.lastName && formik.errors.lastName}</small>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Email *</label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <small>{formik.touched.email && formik.errors.email}</small>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Password *</label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <small>{formik.touched.password && formik.errors.password}</small>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Confirm password *</label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            <small>
              {formik.touched.confirm_password &&
                formik.errors.confirm_password}
            </small>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Type</label>
          <div className="col-sm-3">
            <Select
              fullWidth
              size="small"
              displayEmpty
              label={false}
              name="paymentRailsType"
              value={formik.values.paymentRailsType}
              onChange={formik.handleChange}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">PaymentRails ID</label>
        </div>
        <div className="seperated-space"></div>
        <h6 className="label-title">Access information</h6>
        <div className="row mb-4">
          <label className="col-sm-3">Access level *</label>
          <div className="col-sm-3">
            <Select
              fullWidth
              size="small"
              displayEmpty
              label={false}
              name="access_level"
              value={formik.values.access_level}
              onChange={formik.handleChange}
            >
              <MenuItem value="10">Vendor</MenuItem>
              <MenuItem value="100">Admin</MenuItem>
            </Select>
          </div>
        </div>
        {formik.values.access_level === "100" && (
          <div className="row mb-4">
            <label className="col-sm-3">Roles</label>
            <div className="col-sm-3">
              <Select
                input={<OutlinedInput multiline={true} label={false} />}
                fullWidth
                size="small"
                renderValue={(selected) => {
                  const values = selected.map((val) => {
                    const idx = administrator.findIndex((v) => v.id === val);
                    return administrator[idx].name;
                  });
                  return values.join(", ");
                }}
                name="roles"
                multiple
                value={formik.values.roles}
                onChange={formik.handleChange}
              >
                {administrator.map((val) => (
                  <MenuItem key={val.id} value={val.id}>
                    <Checkbox
                      checked={(formik.values.roles as string[]).includes(
                        val.id
                      )}
                    />
                    <ListItemText primary={val.name} />
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        )}

        <div className="row mb-4">
          <label className="col-sm-3">Membership</label>
          <div className="col-sm-3">
            <Select
              fullWidth
              size="small"
              displayEmpty
              label={false}
              name="membership_id"
              value={formik.values.membership_id}
              onChange={formik.handleChange}
            >
              <MenuItem value="">Ignore Membership</MenuItem>
              <MenuItem value="4">General</MenuItem>
            </Select>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">
            Require to change password on next log in
          </label>
          <div className="col-sm-3">
            <input
              type="checkbox"
              name="forceChangePassword"
              checked={Boolean(formik.values.forceChangePassword)}
              onChange={(e) => {
                formik.setFieldValue(
                  "forceChangePassword",
                  Number(e.target.checked)
                );
              }}
            />
          </div>
        </div>
        <div className="seperated-space"></div>
        <h6 className="label-title">Tax information</h6>
        <div className="row mb-4">
          <label className="col-sm-3">Tax exempt</label>
          <div className="col-sm-3">
            <input
              type="checkbox"
              name="taxExempt"
              checked={Boolean(formik.values.taxExempt)}
              onChange={(e) => {
                formik.setFieldValue("taxExempt", Number(e.target.checked));
              }}
            />
          </div>
        </div>
        <div className="add-user">
          <button
            className="btn"
            type="submit"
            disabled={Boolean(
              Object.keys(formik.errors).toString() ||
                Object.values(formik.values).toString() ===
                  Object.values(formik.initialValues).toString()
            )}
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
