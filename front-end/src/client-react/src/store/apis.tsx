import { createAction } from "@reduxjs/toolkit";

export interface Request {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  data?: any;
  onSuccessActionNames?: string[];
  onErrorActionNames?: string[];
  onStartActionNames?: string[];
}

export const apiCallBegan = createAction<Request>("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
