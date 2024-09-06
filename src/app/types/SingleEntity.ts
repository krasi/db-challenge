export interface SingleEntity<T> {
  entity?: T;
  error: string | null;
  loading: boolean;
}
