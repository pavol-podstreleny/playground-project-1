import axios, { AxiosError } from "axios";
import { HttpMethods, Result } from "./httpService";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    console.log("Error");
    return Promise.reject(error);
  }
);

async function get<T>(url: string): Promise<Result<T>> {
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
      if (error.request) {
        return new Promise<Result<T>>((executor, reject) => {
          reject({
            type: "response",
            statusCode: error.response?.status,
            jsonError: error.toJSON(),
          });
        });
      }

      if (error.response) {
        return new Promise<Result<T>>((executor, reject) => {
          reject({
            type: "response",
            statusCode: error.response?.status,
            jsonError: error.toJSON(),
          });
        });
      }
      return new Promise<Result<T>>((executor, reject) => {
        reject({
          type: "unexpected",
        });
      });
    });
}

export const getAxios: HttpMethods = {
  get,
};
