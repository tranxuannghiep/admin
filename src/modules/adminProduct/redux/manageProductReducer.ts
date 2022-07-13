import { Product, ProductsFilter } from "models/products";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
export interface Params {
  id: string;
  delete: number;
}
export interface MangeProductState {
  productList: Product[];
  filters: ProductsFilter;
  params: Params[];
  paramsUpdate: any[];
}

export const getProductList = createCustomAction(
  "manageProduct/getProductList",
  (data: Product[]) => ({
    data,
  })
);

export const changeFilterProduct = createCustomAction(
  "manageProduct/changeFilterProduct",
  (data: object) => ({
    data,
  })
);
export const changeDeleteProduct = createCustomAction(
  "manageProduct/changeDeleteProduct",
  (params: Params) => ({
    params,
  })
);
export const changeDeleteAllProduct = createCustomAction(
  "manageProduct/changeDeleteAllProduct"
);
export const clearDeleteAllProduct = createCustomAction(
  "manageProduct/clearDeleteAllProduct"
);

export const changeParamsUpdate = createCustomAction(
  "manageProduct/changeParamsUpdate",
  (params: any) => ({
    params,
  })
);

export const clearParamsUpdate = createCustomAction(
  "manageProduct/clearParamsUpdate"
);

const actions = {
  getProductList,
  changeFilterProduct,
  changeDeleteProduct,
  changeDeleteAllProduct,
  clearDeleteAllProduct,
  changeParamsUpdate,
  clearParamsUpdate,
};
type Action = ActionType<typeof actions>;

export default function manageProductReducer(
  state: MangeProductState = {
    productList: [],
    filters: {
      page: 1,
      count: 25,
      order_by: "ASC",
      sort: "name",
      stock_status: "all",
      availability: "all",
      category: "0",
      search: "",
      vendor: {},
      search_type: "",
    },
    params: [],
    paramsUpdate: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getProductList):
      return { ...state, productList: action.data };
    case getType(changeFilterProduct):
      return { ...state, filters: { ...state.filters, ...action.data } };
    case getType(changeDeleteProduct):
      const idx = state.params.findIndex((val) => val.id === action.params.id);
      if (idx === -1) {
        return { ...state, params: [...state.params, action.params] };
      }
      return {
        ...state,
        params: [...state.params.slice(0, idx), ...state.params.slice(idx + 1)],
      };
    case getType(changeDeleteAllProduct):
      const newParams = state.productList.map((val: any) => ({
        id: val.id,
        delete: 1,
      }));
      return { ...state, params: newParams };
    case getType(clearDeleteAllProduct):
      return { ...state, params: [] };
    case getType(changeParamsUpdate):
      const idxUpdate = state.paramsUpdate.findIndex(
        (val) => val.id === action.params.id
      );
      if (idxUpdate === -1) {
        return {
          ...state,
          paramsUpdate: [...state.paramsUpdate, action.params],
        };
      }
      return {
        ...state,
        paramsUpdate: [
          ...state.paramsUpdate.slice(0, idxUpdate),
          { ...action.params },
          ...state.paramsUpdate.slice(idxUpdate + 1),
        ],
      };
    case getType(clearParamsUpdate):
      return {
        ...state,
        paramsUpdate: [],
      };

    default:
      return state;
  }
}
