import { combineReducers } from "redux";
import authReducer from "./../modules/auth/redux/authReducer";
import mangeUserReducer from "../modules/adminUser/redux/mangeUserReducer";
import roleListReducer from "./../modules/common/redux/roleListReducer";
import countryListReducer from "./../modules/common/redux/countryListReducer";
import categoryListReducer from "./../modules/common/redux/categoryListReducer";
import brandListReducer from "./../modules/common/redux/brandListReducer";
import shippingListReducer from "./../modules/common/redux/shippingListReducer";
import vendorListReducer from "./../modules/common/redux/vendorListReducer";
import manageProductReducer from "./../modules/adminProduct/redux/manageProductReducer";

const rootReducer = combineReducers({
  authReducer,
  mangeUserReducer,
  manageProductReducer,
  roleListReducer,
  countryListReducer,
  categoryListReducer,
  brandListReducer,
  vendorListReducer,
  shippingListReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
