import Header from "components/Header/Header";
import SideBar from "components/SideBar/SideBar";
import "./HOCLayout.scss";
import store from "redux/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import { getRoleList } from "modules/common/redux/roleListReducer";
import { getCountryList } from "modules/common/redux/countryListReducer";
import { getCategoryList } from "modules/common/redux/categoryListReducer";
import { getBrandList } from "modules/common/redux/brandListReducer";
import { getVendorList } from "modules/common/redux/vendorListReducer";
import { getShippingList } from "modules/common/redux/shippingListReducer";
import { AUTH } from "utils/constants";
import MiniSideBar from "components/MiniSideBar/MiniSideBar";
import { useState } from "react";

export interface HOCLayoutProps {
  children: React.ReactNode;
}
const getData = async () => {
  const [
    roleList,
    countryList,
    categoryList,
    brandList,
    vendorList,
    shippingList,
  ] = await Promise.all([
    (store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(
      fetchThunk(API_PATHS.getRoleList, "get")
    ),
    (store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(
      fetchThunk(API_PATHS.getCountry, "get")
    ),
    (store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(
      fetchThunk(API_PATHS.getCategory, "get")
    ),
    (store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(
      fetchThunk(API_PATHS.getBrandList, "get")
    ),
    (store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(
      fetchThunk(API_PATHS.getVendorList, "get")
    ),
    (store.dispatch as ThunkDispatch<RootState, null, Action<string>>)(
      fetchThunk(API_PATHS.getShippingList, "get")
    ),
  ]);
  if (roleList.success) {
    store.dispatch(getRoleList(roleList.data));
  }
  if (countryList.success) {
    store.dispatch(getCountryList(countryList.data));
  }
  if (categoryList.success) {
    store.dispatch(getCategoryList(categoryList.data));
  }
  if (brandList.success) {
    store.dispatch(getBrandList(brandList.data));
  }
  if (vendorList.success && vendorList.data) {
    store.dispatch(getVendorList(vendorList.data));
  }
  if (shippingList.success && shippingList.data) {
    store.dispatch(getShippingList(shippingList.data));
  }
};
const Auth = localStorage.getItem(AUTH);
if (Auth) getData();
export default function HOCLayout({ children }: HOCLayoutProps) {
  const [isMenuMini, setIsMenuMini] = useState(false);
  return (
    <div id="HOCLayout">
      <Header setIsMenuMini={setIsMenuMini} />
      <div className="main">
        <div className="main-content">
          {isMenuMini ? (
            <MiniSideBar setIsMenuMini={setIsMenuMini} />
          ) : (
            <SideBar />
          )}

          <div className="main-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
