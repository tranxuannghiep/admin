import * as yup from "yup";

export const validationLoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .test(
      "",
      "Invalid password. Password must be at least 6 characters long, and capital letter at the beginning.",
      (value = "") => {
        return value.length >= 6 && value[0] === value[0].toUpperCase();
      }
    ),
});

export const validationNewUserSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .test(
      "",
      "Invalid password. Password must be at least 6 characters long, and capital letter at the beginning.",
      (value = "") => {
        return value.length >= 6 && value[0] === value[0].toUpperCase();
      }
    ),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const validationUpdateUserSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
});

export const validationAddProductSchema = yup.object({
  vendor_id: yup.string().required("This field is required"),
  name: yup.string().required("This field is required"),
  brand_id: yup.string().required("This field is required"),
  condition_id: yup.string().required("This field is required"),
  imagesUpload: yup.array().min(1, "This field is required"),
  categories: yup.array().min(1, "This field is required"),
  description: yup.string(),
  price: yup.string().required("This field is required"),
  participate_sale: yup.string(),
  sale_price: yup.string().when(["participate_sale"], {
    is: (participate_sale: string) => {
      if (participate_sale === "1") return true;
      else return false;
    },
    then: (schema) =>
      schema
        .required("This field is required")
        .test(
          "Sale Price must be greater than 0",
          "Sale Price must be greater than 0",
          (value: any) => Number(value) > 0
        ),
  }),
  quantity: yup.string().required("This field is required"),
  shipping_to_zones: yup.array(
    yup.object({
      price: yup.string().required("This field is required"),
    })
  ),
});
