import axios, { AxiosError, AxiosResponse, AxiosTransformer } from "axios";
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
    .get<T>(url, {
      headers: ["Access-Control-Allow-Origin:*"],
    })
    .then((value) => {
      return new Promise<Result<T>>((executor, reject) => {
        return executor({
          containsError: false,
          statusCode: value.status,
          data: value.data,
        });
      });
    })
    .catch(function (error) {
      console.log(error);
      if (error.response) {
        return new Promise<Result<T>>((executor, reject) => {
          executor({
            containsError: true,
            statusCode: error.response.status,
          });
        });
      }
      return new Promise<Result<T>>((executor, reject) => {
        executor({
          containsError: true,
          statusCode: 0,
        });
      });
    });
}

export const getAxios = <T>(): HttpMethods<T> => {
  return { get };
};
