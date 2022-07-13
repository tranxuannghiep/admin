import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface IVendor {
  id: string;
  name: string;
}

export interface VendorState {
  vendorList: IVendor[];
}

export const getVendorList = createCustomAction(
  "manage/getVendorList",
  (data: IVendor[]) => ({
    data,
  })
);

const actions = {
  getVendorList,
};
type Action = ActionType<typeof actions>;

export default function vendorListReducer(
  state: VendorState = {
    vendorList: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getVendorList):
      return {
        ...state,
        vendorList: action.data,
      };

    default:
      return state;
  }
}
