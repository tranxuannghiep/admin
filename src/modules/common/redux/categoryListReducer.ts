import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface ICategory {
  id: string;
  name: string;
  parentId: string;
  path: string;
  pos: string;
}

export interface CategoryState {
  categoryList: ICategory[];
}

export const getCategoryList = createCustomAction(
  "manage/getCategoryList",
  (data: ICategory[]) => ({
    data,
  })
);

const actions = {
  getCategoryList,
};
type Action = ActionType<typeof actions>;

export default function categoryListReducer(
  state: CategoryState = {
    categoryList: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getCategoryList):
      return {
        ...state,
        categoryList: action.data,
      };

    default:
      return state;
  }
}
