export interface PortfolioImagesData {
  id: string;
  image: string;
  created_at: string;
  created_by: number;
}

export interface PortfolioImagesResponse {
  data: PortfolioImagesData[];
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
