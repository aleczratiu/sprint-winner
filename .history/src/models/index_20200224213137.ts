export interface ITodoItem {
  id: number;
  admin: string;
  name: string;
}

export enum ApiStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}
