export interface PortfolioReviewsData {
  id: string;
  product_id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  created_at: string;
  created_by: number;
  product_name: string;
  product_image: string;
}

export interface PortfolioReviewResponse {
  data: PortfolioReviewsData[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
