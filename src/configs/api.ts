import { APIHost } from "utils/constants";

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/api/authentication`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return "";
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  getUserList: `${getBaseUrl(APIService.public)}/apiAdmin/users/list`,
  getUserDetail: `${getBaseUrl(APIService.public)}/apiVendor/profile/detail`,
  updateUserList: `${getBaseUrl(APIService.public)}/apiAdmin/users/edit`,
  createUser: `${getBaseUrl(APIService.public)}/apiAdmin/users/create`,
  getRoleList: `${getBaseUrl(APIService.public)}/apiAdmin/commons/role`,
  getCountry: `${getBaseUrl(APIService.public)}/apiAdmin/commons/country`,
  getCategory: `${getBaseUrl(APIService.public)}/api/categories/list`,
  getBrandList: `${getBaseUrl(APIService.public)}/apiAdmin/brands/list`,
  getShippingList: `${getBaseUrl(APIService.public)}/apiAdmin/shipping/list`,
  getVendorList: `${getBaseUrl(APIService.public)}/apiAdmin/vendors/list`,
  getState: `${getBaseUrl(APIService.public)}/apiAdmin/commons/state`,
  createProduct: `${getBaseUrl(APIService.public)}/apiAdmin/products/create`,
  getProductDetail: `${getBaseUrl(APIService.public)}/apiAdmin/products/detail`,
  getProductList: `${getBaseUrl(APIService.public)}/api/products/list`,
  updateProductList: `${getBaseUrl(APIService.public)}/apiAdmin/products/edit`,
  uploadProductImage: `${getBaseUrl(
    APIService.public
  )}/api/products/upload-image`,
};
