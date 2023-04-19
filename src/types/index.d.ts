export interface Event {
  id?: string; // supabase
  created_at?: string; // supabase
  updated_at?: string; // supabase
  user_id?: string;
  date?: string | null;
  duration?: number;
  locations?: [number?];
  symptomes?: [number?];
  medications?: [number?];
  count?: number;
}
