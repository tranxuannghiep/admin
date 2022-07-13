import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface IAdministrator {
  id: string;
  enabled: string;
  name: string;
}

export interface ICustomer {
  id: string;
  name: string;
}

export interface RoleState {
  administrator: IAdministrator[];
  customer: ICustomer[];
}

export const getRoleList = createCustomAction(
  "manageUser/getRoleList",
  (data: RoleState) => ({
    data,
  })
);

const actions = {
  getRoleList,
};
type Action = ActionType<typeof actions>;

export default function roleListReducer(
  state: RoleState = {
    administrator: [],
    customer: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getRoleList):
      return {
        ...state,
        administrator: action.data.administrator,
        customer: action.data.customer,
      };

    default:
      return state;
  }
}
