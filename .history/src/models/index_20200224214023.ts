export interface User {
  id: number;
  admin: string;
  name: null;
}

export enum ApiStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}
