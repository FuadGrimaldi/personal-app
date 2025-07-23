export interface TopicType {
  id: number;
  title: string;
  description: string;
  src: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  role: string;
  message: string;
  created_at: string;
}

export interface ChatType {
  id: number; // Unique chat ID
  title: string; // Title of the chat
  user_id: number; // Owner user ID
  topic_id: number | null; // Optional topic grouping
  created_at: string; // ISO timestamp of creation
  updated_at: string; // ISO timestamp of last update
  history: ChatMessage[]; // Array of all messages in this chat :contentReference[oaicite:0]{index=0}
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
