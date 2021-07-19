import axios, { AxiosError } from "axios";
import { Request } from "../../store/apis";
import { HttpMethods, Result } from "./httpService";

interface CustomerApiErrorResponse {
  errors: string[] | null;
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    // Maybe do some log uploads :)
    return Promise.reject(error);
  }
);

function extractErrorMessages(
  error: AxiosError<CustomerApiErrorResponse>
): string | undefined {
  const errors = error?.response
    ? error?.response?.data?.errors
    : error?.request?.data?.errors;

  const errorMessages = [];

  if (errors) {
    for (let key in errors) {
      errorMessages.push(errors[key]);
    }
  }
  if (errorMessages) return errorMessages.join(" ");
  return undefined;
}

function handleError<T>(error: any): Promise<Result<T>> {
  if (error.request) {
    return new Promise<Result<T>>((executor, reject) => {
      reject({
        type: "request",
        errorMessages: extractErrorMessages(error),
      });
    });
  }

  if (error.response) {
    return new Promise<Result<T>>((executor, reject) => {
      reject({
        type: "response",
        errorMessages: extractErrorMessages(error),
      });
    });
  }
  return new Promise<Result<T>>((executor, reject) => {
    reject({
      type: "unexpected",
    });
  });
}

function request<T>(request: Request, baseURL: string): Promise<Result<T>> {
  return axios
    .request({
      baseURL,
      data: request.data,
      method: request.method,
      url: request.url,
    })
    .then((value) => {
      return new Promise<Result<T>>((executor, reject) => {
        return executor({
          statusCode: value.status,
          data: value.data,
        });
      });
    })
    .catch(function (error) {
      return handleError(error);
    });
}

export const getAxios: HttpMethods = {
  request,
};
