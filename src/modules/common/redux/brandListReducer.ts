import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface IBrand {
  id: string | null;
  name: string;
}

export interface BrandState {
  brandList: IBrand[];
}

export const getBrandList = createCustomAction(
  "manage/getBrandList",
  (data: IBrand[]) => ({
    data,
  })
);

const actions = {
  getBrandList,
};
type Action = ActionType<typeof actions>;

export default function brandListReducer(
  state: BrandState = {
    brandList: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getBrandList):
      return {
        ...state,
        brandList: action.data,
      };

    default:
      return state;
  }
}
