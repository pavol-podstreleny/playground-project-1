import { getAxios } from "./axiosService";

export interface Result<T> {
  statusCode: number;
  data?: T;
}

export interface Error {
  type: "request" | "response" | "unexpected";
  statusCode?: number;
  jsonError?: object;
}

export interface HttpMethods {
  get<T>(url: string): Promise<Result<T>>;
}

export const http = getAxios;
