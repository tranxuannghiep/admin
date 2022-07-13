import { IUser } from "configs/user";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
export interface AuthState {
  user?: IUser;
  loading?: boolean;
}

export const setUserLoading = createCustomAction(
  "auth/setUserLoading",
  (data: boolean) => ({
    data,
  })
);

const actions = {
  setUserLoading,
};
type Action = ActionType<typeof actions>;

export default function authReducer(
  state: AuthState = { loading: false },
  action: Action
) {
  switch (action.type) {
    case getType(setUserLoading):
      return { ...state, loading: action.data };
    default:
      return state;
  }
}
