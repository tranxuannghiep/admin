import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailProductPage.scss";
import { Form, Formik } from "formik";
import AddProductForm from "modules/adminProduct/components/ProductForm/AddProductForm/AddProductForm";
import PricesInventory from "modules/adminProduct/components/ProductForm/PricesInventory/PricesInventory";
import Shipping from "modules/adminProduct/components/ProductForm/Shipping/Shipping";
import Marketing from "modules/adminProduct/components/ProductForm/Marketing/Marketing";
import { useCallback, useEffect, useRef, useState } from "react";
import { AUTH } from "utils/constants";
import axios from "axios";
import { API_PATHS } from "configs/api";
import Loading from "components/Loading/Loading";
import { useSnackbar } from "notistack";
import { validationAddProductSchema } from "utils/validate.util";
import { initialValuesDetailProduct } from "modules/adminProduct/utils/initialValuesProduct";
import { Images } from "models/products";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";

export interface DetailProductPageProps {}
export default function DetailProductPage(props: DetailProductPageProps) {
  const navigate = useNavigate();
  const refDesc = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const { id } = useParams();

  const [productDetail, setproductDetail] = useState<any>({});
  const getProductDetailById = useCallback(
    async (id: string | undefined) => {
      setLoading(true);
      setproductDetail({});
      const json = await dispatch(
        fetchThunk(API_PATHS.getProductDetail, "post", { id })
      );
      setLoading(false);
      if (json.success) {
        setproductDetail(json.data);
      }
    },
    [dispatch]
  );
  useEffect(() => {
    getProductDetailById(id);
  }, [getProductDetailById, id, reset]);

  return (
    <div id="DetailProductPage">
      {loading && <Loading />}
      <div
        className="back-to-prev d-flex align-items-center justify-content-center mb-2"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft />
      </div>

      {Object.keys(productDetail).length > 0 && (
        <Formik
          initialValues={initialValuesDetailProduct(productDetail)}
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
                dataUpload.map((item: FormData) =>
                  axios.post(API_PATHS.uploadProductImage, item, config)
                )
              );
              if (result) {
                enqueueSnackbar("Update successfully", { variant: "success" });
                setReset((prev) => prev + 1);
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
              <h4 className="title mb-5">{productDetail.name}</h4>
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
                  disabled={Boolean(Object.keys(formik.errors).toString())}
                >
                  Update Product
                </button>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
}
