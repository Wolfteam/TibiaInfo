export interface Response<T> {
  result: T;
  succeed: boolean;
  message: string;
}
