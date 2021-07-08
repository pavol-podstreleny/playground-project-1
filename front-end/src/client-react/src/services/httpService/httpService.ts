import { getAxios } from "./axiosService";

export interface Result<T> {
  containsError: boolean;
  statusCode: number;
  data?: T;
}

export interface HttpMethods<T> {
  get(url: string): Promise<Result<T>>;
}

export const http = <T>(): HttpMethods<T> => getAxios<T>();
