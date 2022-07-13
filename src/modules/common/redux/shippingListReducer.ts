import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface IShipping {
  id: string | null;
  name: string;
}

export interface ShippingState {
  shippingList: IShipping[];
}

export const getShippingList = createCustomAction(
  "manage/getShippingList",
  (data: IShipping[]) => ({
    data,
  })
);

const actions = {
  getShippingList,
};
type Action = ActionType<typeof actions>;

export default function shippingListReducer(
  state: ShippingState = {
    shippingList: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getShippingList):
      return {
        ...state,
        shippingList: action.data,
      };

    default:
      return state;
  }
}
