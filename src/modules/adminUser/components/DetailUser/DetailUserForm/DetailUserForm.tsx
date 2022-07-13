import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { UserDetail } from "models/user";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import { validationUpdateUserSchema } from "utils/validate.util";
import "./DetailUserForm.scss";
export interface DetailUserFormProps {
  userDetail: UserDetail;
  handleUpdate: Function;
}

export default function DetailUserForm({
  handleUpdate,
  userDetail,
}: DetailUserFormProps) {
  const { administrator } = useSelector(
    (state: RootState) => state.roleListReducer
  );
  const formik = useFormik({
    initialValues: {
      id: userDetail.profile_id,
      firstName: (userDetail.firstName as string) || "",
      lastName: (userDetail.lastName as string) || "",
      email: userDetail.email as string,
      password: "",
      confirm_password: "",
      status: userDetail.status,
      statusComment: userDetail.statusComment || "",
      membership_id: userDetail.membership_id ? userDetail.membership_id : "",
      pending_membership_id: userDetail.pending_membership_id,
      paymentRailsType: userDetail.paymentRailsType,
      paymentRailsId: userDetail.paymentRailsId,
      access_level: userDetail.access_level,
      roles: userDetail.roles?.toString() === "" ? [] : userDetail.roles,
      forceChangePassword: userDetail.forceChangePassword,
      taxExempt: userDetail.taxExempt,
    },
    validationSchema: validationUpdateUserSchema,
    onSubmit: (values) => {
      if (handleUpdate) {
        handleUpdate(values);
      }
    },
  });
  return (
    <div id="DetailUserForm">
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
          <label className="col-sm-3">Password</label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              name="password"
              autoComplete="true"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Confirm password</label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              autoComplete="true"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Type</label>
          <span className="col-sm-3">{formik.values.paymentRailsType}</span>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">PaymentRails ID</label>
          <span className="col-sm-3">{formik.values.paymentRailsId}</span>
        </div>
        <div className="seperated-space"></div>
        <h6 className="label-title">Access information</h6>
        <div className="row mb-4">
          <label className="col-sm-3">Access level</label>
          <div className="col-sm-3">
            {formik.values.access_level === "10" ? "Vendor" : "Administrator"}
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
                  if (selected.length === 0) return;
                  const values = selected.map((val: any) => {
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
          <label className="col-sm-3">Account status *</label>
          <div className="col-sm-3">
            <Select
              fullWidth
              size="small"
              label={false}
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              displayEmpty
            >
              <MenuItem value="E">Enabled</MenuItem>
              <MenuItem value="D">Disabled</MenuItem>
              <MenuItem value="U">Unapproved ventor</MenuItem>
            </Select>
          </div>
        </div>
        <div className="row mb-4">
          <label className="col-sm-3">Status comment (reason)</label>
          <div className="col-sm-6">
            <textarea
              className="form-control"
              name="statusComment"
              value={formik.values.statusComment}
              onChange={formik.handleChange}
            />
          </div>
        </div>
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
          <label className="col-sm-3">Pending membership</label>
          <div className="col-sm-3">
            <span>{formik.values.pending_membership_id || "none"}</span>
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
              checked={Boolean(Number(formik.values.forceChangePassword))}
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
              checked={Boolean(Number(formik.values.taxExempt))}
              onChange={(e) => {
                formik.setFieldValue("taxExempt", Number(e.target.checked));
              }}
            />
          </div>
        </div>
        <div className="update-user">
          <button
            className="btn"
            type="submit"
            disabled={Boolean(
              Object.keys(formik.errors).toString() ||
                Object.values(formik.values).toString() ===
                  Object.values(formik.initialValues).toString()
            )}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
