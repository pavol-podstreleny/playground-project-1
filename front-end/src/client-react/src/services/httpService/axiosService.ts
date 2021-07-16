import axios, { AxiosError } from "axios";
import { HttpMethods, Result } from "./httpService";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    console.log(error);
    return Promise.reject(error);
  }
);

function extractErrorMessages(
  error: any,
  type: "response" | "request"
): string | undefined {
  const errors = error?.error?.response?.data?.errors;
  const errorMessages = [];
  if (errors) {
    for (let key in errors) {
      errorMessages.push(errors[key]);
    }
  }
  console.log(errorMessages);
  if (errorMessages) return errorMessages.join(" ");
  return undefined;
}

function handleError<T>(error: any): Promise<Result<T>> {
  console.log("error lol");
  if (error.request) {
    return new Promise<Result<T>>((executor, reject) => {
      reject({
        error: error,
        type: "request",
        errorMessages: extractErrorMessages(error, "request"),
      });
    });
  }

  if (error.response) {
    return new Promise<Result<T>>((executor, reject) => {
      console.log("error response");
      reject({
        error: error,
        type: "response",
        errorMessages: extractErrorMessages(error, "response"),
      });
    });
  }
  return new Promise<Result<T>>((executor, reject) => {
    reject({
      error: error,
      type: "unexpected",
    });
  });
}

function post<T>(url: string, data: T): Promise<Result<T>> {
  return axios
    .post(url, data)
    .then((value) => {
      return new Promise<Result<T>>((executor, reject) => {
        return executor({
          statusCode: value.status,
          data: value.data,
        });
      });
    })
    .catch(function (error) {
      return handleError<T>(error);
    });
}

function get<T>(url: string): Promise<Result<T>> {
  return axios
    .get<T>(url)
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
  get,
  post,
};
