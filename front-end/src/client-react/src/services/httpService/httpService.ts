import { Request } from "../../store/apis";
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
  request<T>(request: Request, baseURL: string): Promise<Result<T>>;
}

export const http = getAxios;
