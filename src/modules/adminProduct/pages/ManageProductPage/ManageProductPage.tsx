import Loading from "components/Loading/Loading";
import { API_PATHS } from "configs/api";
import { ROUTES } from "configs/routes";
import BtnUpdateProduct from "modules/adminProduct/components/ManageProduct/BtnUpdateProduct/BtnUpdateProduct";
import FilterProduct from "modules/adminProduct/components/ManageProduct/FilterProduct/FilterProduct";
import TableProduct from "modules/adminProduct/components/ManageProduct/TableProduct/TableProduct";
import {
  changeFilterProduct,
  clearDeleteAllProduct,
  clearParamsUpdate,
  getProductList,
} from "modules/adminProduct/redux/manageProductReducer";
import PaginationComponent from "modules/common/components/PaginationComponent/PaginationComponent";
import { fetchThunk } from "modules/common/redux/thunk";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import queryString from "query-string";
import "./ManageProductPage.scss";
import { ProductsFilter } from "models/products";

export interface ManageProductPageProps {}

export default function ManageProductPage(props: ManageProductPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const { filters } = useSelector(
    (state: RootState) => state.manageProductReducer
  );
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...filters,
      ...params,
    };
  }, [location.search, filters]);
  const [totalPage, setTotalPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const getData = useCallback(
    async (values: ProductsFilter) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.getProductList, "post", values)
      );
      setLoading(false);
      if (json.success && Boolean(json.data)) {
        setTotalPage(Number(json.recordsTotal));
        dispatch(getProductList(json.data));
        dispatch(clearDeleteAllProduct());
        dispatch(clearParamsUpdate());
      } else {
        setTotalPage(0);
        dispatch(getProductList([]));
        dispatch(clearDeleteAllProduct());
        dispatch(clearParamsUpdate());
      }
    },
    [dispatch]
  );

  const handleChangeFilter = (values: object) => {
    dispatch(changeFilterProduct(values));
  };

  const handleUpdate = async (values: object) => {
    setLoading(true);
    const json = await dispatch(
      fetchThunk(API_PATHS.updateProductList, "post", { params: values })
    );
    if (json.success) {
      getData(queryParams);
      enqueueSnackbar("Update successfully", { variant: "success" });
    } else {
      setLoading(false);
      enqueueSnackbar("Update failed", { variant: "error" });
    }
  };

  useEffect(() => {
    getData(queryParams);
  }, [getData, queryParams]);
  return (
    <div id="ManageProductPage">
      {loading && <Loading />}
      <FilterProduct />
      <Button
        variant="primary"
        className="mb-4 btn-add-product"
        onClick={() => navigate(ROUTES.newProduct)}
      >
        Add Product
      </Button>
      <TableProduct handleUpdate={handleUpdate} />
      <PaginationComponent
        filters={filters}
        total={totalPage}
        handleChange={handleChangeFilter}
      />
      <BtnUpdateProduct handleUpdate={handleUpdate} />
    </div>
  );
}
