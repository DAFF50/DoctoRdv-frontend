export interface Notifications {
  id: number;
  type: string;
  title: string;
  message: string;
  details?: Record<string, unknown>;
  icon: string;
  est_lu: boolean;
  created_at: string;
}
