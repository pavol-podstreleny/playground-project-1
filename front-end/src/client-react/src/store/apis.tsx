import { createAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export interface Request<T> {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  data?: T;
  onSuccess: AnyAction;
  onError: AnyAction;
  onStart: AnyAction;
}

export const apiCallBegan = createAction("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
