export interface User {
  id: number;
  admin: string;
  name: any;
}

export enum ApiStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}
