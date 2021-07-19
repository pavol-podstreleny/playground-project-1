import { Middleware, AnyAction } from "redux";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../apis";
import { customerAPI } from "../../config/config.json";
import { Request } from "../apis";
import { http } from "../../services/httpService/httpService";

export interface Api {
  get: RequestProgress;
  post: RequestProgress;
  patch: RequestProgress;
  delete: RequestProgress;
  [state: string]: RequestProgress | null;
}

export interface RequestProgress {
  isLoading: boolean;
  errorMessage: string | null;
}

export interface RequestMethod {
  method: "get" | "post" | "patch" | "delete";
}

export interface RequestFailed extends RequestMethod {
  errorMessage: string;
}
export interface RequestSuccess<T> extends RequestMethod {
  data: T;
}

const apiMiddleware: Middleware<{}, any> =
  ({ dispatch }) =>
  (next) =>
  async (action: AnyAction) => {
    if (action.type !== apiCallBegan.type) {
      return next(action);
    }

    const payloadRequest = action.payload as Request;
    const { onSuccessActionNames, onErrorActionNames, onStartActionNames } =
      payloadRequest;

    // Dispatch onStartActions  if specified in payload
    if (onStartActionNames) {
      console.log(onStartActionNames);
      for (let actionName of onStartActionNames) {
        console.log(actionName);
        dispatch({
          type: actionName,
          payload: { method: payloadRequest.method },
        });
      }
    }

    next(action);

    // Fetch data
    try {
      const response = await http.request(payloadRequest, customerAPI);
      // General
      dispatch(apiCallSuccess());
      // Specific
      if (onSuccessActionNames) {
        for (let actionName of onSuccessActionNames) {
          dispatch({
            type: actionName,
            payload: response.data || payloadRequest.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
      // General API error
      dispatch(apiCallFailed());
      // Specific onError action if specified
      if (onErrorActionNames)
        for (let actionName of onErrorActionNames) {
          dispatch({
            type: actionName,
            payload: {
              method: payloadRequest.method,
              errorMessage: error.errorMessages,
            },
          });
        }
    }
  };
export default apiMiddleware;
