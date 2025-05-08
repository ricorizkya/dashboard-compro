export interface MessageData {
  id: string;
  name: string;
  company: string;
  product_id: string;
  address: string;
  description: string;
  date_schedule: string;
  phone: string;
  created_at: string;
  created_by: number;
  edited_at: string;
  product_name: string;
  product_image: string;
}

export interface MessagesResponse {
  data: MessageData[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}
