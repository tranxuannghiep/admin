export interface User {
  access_level: string;
  created: string;
  fistName: string;
  lastName: string;
  last_login: string;
  order: { order_as_buyer: number; order_as_buyer_total: number };
  product: number;
  profile_id: string;
  storeName: null;
  vendor: string;
  vendor_id: string;
  wishlist: string;
}

export interface UserFilter {
  address: string;
  count: number;
  country: string;
  date_range: string[];
  date_type: string;
  memberships: string[];
  order_by: string;
  page: number;
  phone: string;
  search: string;
  sort: string;
  state: string;
  status: string[];
  types: string[];
  tz: number;
}

export interface UserDetail {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirm_password: string | null;
  status: string | null;
  statusComment: string | null;
  membership_id: string | null;
  pending_membership_id: string | null;
  paymentRailsType: string | null;
  paymentRailsId: string | null;
  access_level: string;
  roles: string[];
  forceChangePassword: string;
  taxExempt: string;
  order_as_buyer: number;
  order_as_buyer_total: number;
  income: string;
  expense: string;
  earning: number;
  products_total: string;
  joined: string | null;
  last_login: string | null;
  language: string;
  referer: string;
  companyName: string | null;
  profile_id: string;
}
