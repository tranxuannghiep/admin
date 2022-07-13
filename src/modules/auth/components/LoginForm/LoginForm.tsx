import { useFormik } from "formik";
import { ILoginParams } from "models/auth";
import { Col, Form, Row } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { validationLoginSchema } from "utils/validate.util";
import "./LoginForm.scss";

export interface LoginFormProps {
  onLogin(values: ILoginParams): void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: (values) => {
      if (onLogin) onLogin(values);
    },
  });

  return (
    <div id="LoginForm">
      <div className="wrapper-box-login">
        <h3>Login</h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Col sm="12">
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Col>
            <small className="text-danger px-3">
              {formik.touched.email && formik.errors.email}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm="12">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Col>
            <small className="text-danger px-3">
              {formik.touched.password && formik.errors.password}
            </small>
          </Form.Group>
          <button
            type="submit"
            className="btn btn-success d-flex align-items-center justify-content-center w-100"
            disabled={Boolean(
              Object.keys(formik.errors).toString() ||
                Object.values(formik.values).toString() ===
                  Object.values(formik.initialValues).toString()
            )}
          >
            <FaSignInAlt />
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
