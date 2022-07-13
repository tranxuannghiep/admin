import { User, UserFilter } from "models/user";
import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface Params {
  id: string;
  delete: number;
}
export interface MangeUserState {
  userList: User[];
  filters: UserFilter;
  params: Params[];
}

export const getUserList = createCustomAction(
  "manageUser/getUserList",
  (data: User[]) => ({
    data,
  })
);

export const changeFilterUser = createCustomAction(
  "manageUser/changeFilterUser",
  (data: object) => ({
    data,
  })
);

export const changeDeleteUser = createCustomAction(
  "manageUser/changeDeleteUser",
  (params: Params) => ({
    params,
  })
);

export const changeDeleteAllUser = createCustomAction(
  "manageUser/changeDeleteAllUser"
);
export const clearDeleteAllUser = createCustomAction(
  "manageUser/clearDeleteAllUser"
);

const actions = {
  getUserList,
  changeFilterUser,
  changeDeleteUser,
  changeDeleteAllUser,
  clearDeleteAllUser,
};
type Action = ActionType<typeof actions>;

export default function mangeUserReducer(
  state: MangeUserState = {
    userList: [],
    filters: {
      page: 1,
      count: 25,
      address: "",
      country: "",
      date_range: [],
      date_type: "R",
      memberships: [],
      order_by: "DESC",
      phone: "",
      search: "",
      sort: "last_login",
      state: "",
      status: [],
      types: [],
      tz: 7,
    },
    params: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getUserList):
      return { ...state, userList: action.data };
    case getType(changeFilterUser):
      return { ...state, filters: { ...state.filters, ...action.data } };
    case getType(changeDeleteUser):
      const idx = state.params.findIndex((val) => val.id === action.params.id);
      if (idx === -1) {
        return { ...state, params: [...state.params, action.params] };
      }
      return {
        ...state,
        params: [...state.params.slice(0, idx), ...state.params.slice(idx + 1)],
      };
    case getType(changeDeleteAllUser):
      const newParams = state.userList.map((val) => ({
        id: val.profile_id,
        delete: 1,
      }));
      return { ...state, params: newParams };
    case getType(clearDeleteAllUser):
      return { ...state, params: [] };
    default:
      return state;
  }
}
