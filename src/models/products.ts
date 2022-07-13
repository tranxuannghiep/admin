export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  amount: string;
  vendor: string;
  arrivalDate: string;
  vendorID: string;
  enabled: string;
}

export interface ProductsFilter {
  page: number;
  count: number;
  order_by: string;
  sort: string;
  stock_status: string;
  availability: string;
  category: string;
  search: string;
  vendor: string | object;
  search_type: string;
}

export interface Categories {
  id: string;
  name: string;
}

export interface Shipping {
  id: string;
  price: string;
}

export interface Images {
  id: number;
  file: string;
}

export interface CreateProduct {
  id: string;
  vendor_id: string;
  name: string;
  brand_id: string;
  condition_id: string;
  sku: string;
  imagesUpload: (File | Images)[];
  imagesOrder: string[];
  deleted_images: number[];
  categories: Categories[];
  description: string;
  enabled: string;
  participate_sale: string;
  memberships: string[];
  tax_exempt: string;
  price: string;
  sale_price_type: string;
  sale_price: string;
  arrival_date: string;
  quantity: string;
  shipping_to_zones: Shipping[];
  og_tags_type: string;
  og_tags: string;
  meta_description: string;
  meta_desc_type: string;
  meta_keywords: string;
  product_page_title: string;
  facebook_marketing_enabled: string;
  google_feed_enabled: string;
}

export interface DetailProduct {
  id?: string;
  vendor_id?: string;
  name?: string;
  brand_id?: string;
  condition_id?: string;
  sku?: string;
  images: { id: string; file: string; thumbs: string[] }[];
  categories: { category_id: string; name: string }[];
  description?: string;
  enabled?: string;
  participate_sale?: string;
  memberships: { membership_id: string }[];
  tax_exempt?: string;
  price?: string;
  sale_price_type?: string;
  sale_price?: string;
  arrival_date?: string;
  quantity?: string;
  shipping: { id: string; price: string; zone_name: string }[];
  og_tags_type?: string;
  og_tags?: string | null;
  meta_description?: string | null;
  meta_desc_type?: string;
  meta_keywords?: string;
  product_page_title?: string;
  facebook_marketing_enabled?: string;
  google_feed_enabled?: string;
}
