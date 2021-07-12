import { getAxios } from "./axiosService";

export interface Result<T> {
  statusCode: number;
  data?: T;
}

export interface Error {
  error: any;
  type: "request" | "response" | "unexpected";
}

export interface HttpMethods {
  get<T>(url: string): Promise<Result<T>>;
  post<T>(url: string, data: T): Promise<Result<T>>;
}

export const http = getAxios;
