export interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  type_product: string;
  image: string;
  status: boolean;
  created_at: string;
}

export interface ProductResponse {
  data: ProductData[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}
