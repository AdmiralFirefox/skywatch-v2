export interface SearchHistoryProps {
  id: string;
  place?: string;
  icon?: string;
  temp?: number;
  time_searched?: {
    seconds: number;
  };
}
