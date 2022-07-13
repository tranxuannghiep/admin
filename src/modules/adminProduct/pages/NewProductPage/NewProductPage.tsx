import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./NewProductPage.scss";
import { Form, Formik } from "formik";
import AddProductForm from "modules/adminProduct/components/ProductForm/AddProductForm/AddProductForm";
import PricesInventory from "modules/adminProduct/components/ProductForm/PricesInventory/PricesInventory";
import Shipping from "modules/adminProduct/components/ProductForm/Shipping/Shipping";
import Marketing from "modules/adminProduct/components/ProductForm/Marketing/Marketing";
import { useRef, useState } from "react";
import { AUTH } from "utils/constants";
import axios from "axios";
import { API_PATHS } from "configs/api";
import Loading from "components/Loading/Loading";
import { useSnackbar } from "notistack";
import { validationAddProductSchema } from "utils/validate.util";
import { initialValuesAddProduct } from "modules/adminProduct/utils/initialValuesProduct";
import { Images } from "models/products";
import { ROUTES } from "configs/routes";

export interface NewProductPageProps {}
export default function NewProductPage(props: NewProductPageProps) {
  const navigate = useNavigate();
  const refDesc = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div id="NewProductPage">
      {loading && <Loading />}
      <div
        className="back-to-prev d-flex align-items-center justify-content-center mb-2"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft />
      </div>
      <h4 className="title mb-5">Add Product</h4>
      <Formik
        initialValues={initialValuesAddProduct}
        validationSchema={validationAddProductSchema}
        onSubmit={async (values, { setErrors }) => {
          if (!Boolean(refDesc.current?.value)) {
            setErrors({ description: "This field is required" });
            return;
          }
          setLoading(true);
          const productDetail = {
            ...values,
            description: refDesc.current?.value,
            categories: values.categories.map((val) => val.id),
          };
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: localStorage.getItem(AUTH) || "",
            },
          };
          const formData = new FormData();
          formData.append("productDetail", JSON.stringify(productDetail));
          const json = await axios.post(
            API_PATHS.createProduct,
            formData,
            config
          );
          if (json && json.data.success) {
            const dataUpload = [] as FormData[];
            productDetail.imagesUpload.forEach(
              (item: File | Images, index: number) => {
                if (Object.keys(item).length !== 2) {
                  const formUpload = new FormData();
                  formUpload.append("productId", json.data.data);
                  formUpload.append("order", JSON.stringify(index));
                  formUpload.append("images[]", item as File);
                  dataUpload.push(formUpload);
                }
              }
            );
            const result = await Promise.all(
              dataUpload.map((item: any) =>
                axios.post(API_PATHS.uploadProductImage, item, config)
              )
            );
            if (result) {
              navigate(`${ROUTES.detailProduct}/${json.data.data}`);
              enqueueSnackbar("Create successfully", { variant: "success" });
            } else {
              enqueueSnackbar("Upload Image Failed", { variant: "error" });
            }
          } else {
            enqueueSnackbar(json.data.errors, { variant: "error" });
          }
          setLoading(false);
        }}
        render={(formik) => (
          <Form>
            <AddProductForm form={formik} ref={refDesc} />
            <div className="seperated-space"></div>
            <PricesInventory form={formik} />
            <div className="seperated-space"></div>
            <Shipping form={formik} />
            <div className="seperated-space"></div>
            <Marketing form={formik} />
            <div className="btn-product">
              <button
                className="btn"
                type="submit"
                disabled={Boolean(
                  Object.keys(formik.errors).toString() ||
                    Object.values(formik.values).toString() ===
                      Object.values(formik.initialValues).toString()
                )}
              >
                Add Product
              </button>
            </div>
          </Form>
        )}
      />
    </div>
  );
}
