import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface ICountry {
  active_currency: string | null;
  code: string;
  code3: string;
  country: string;
  currency_id: string;
  enabled: string;
  id: string;
  is_fraudlent: string;
}

export interface CountryState {
  country: ICountry[];
}

export const getCountryList = createCustomAction(
  "manageUser/getCountryList",
  (data: ICountry[]) => ({
    data,
  })
);

const actions = {
  getCountryList,
};
type Action = ActionType<typeof actions>;

export default function countryListReducer(
  state: CountryState = {
    country: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getCountryList):
      return {
        ...state,
        country: action.data,
      };

    default:
      return state;
  }
}
