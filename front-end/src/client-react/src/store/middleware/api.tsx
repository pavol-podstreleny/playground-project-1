import axios from "axios";
import { Middleware, AnyAction } from "redux";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../apis";
import { RootState } from "../store";
import { customerAPI } from "../../config/config.json";
import { Request } from "../apis";

function apiMiddleware<T extends Request<T>>() {
  const api: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action: AnyAction) => {
      if (action.type !== apiCallBegan.type) {
        return next(action);
      }

      const { url, method, data, onSuccess, onError, onStart } =
        action.payload as Request<T>;

      // Dispatch onStart action if specified in payload
      if (onStart) dispatch(onStart);

      next(action);

      // Fetch data
      try {
        const response = await axios.request({
          baseURL: customerAPI,
          url,
          method,
          data,
        });
        // General
        dispatch(apiCallSuccess());
        // Specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      } catch (error) {
        // General API error
        dispatch(apiCallFailed());
        // Specific onError action if specified
        if (onError) dispatch({ type: onError, payload: error });
      }
    };
  return api;
}
export default apiMiddleware;
