export interface CarouselData {
  id: string;
  image: string;
  title: string;
  description: string;
  status: boolean;
  created_at: string;
}

export interface CarouselResponse {
  data: CarouselData[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
