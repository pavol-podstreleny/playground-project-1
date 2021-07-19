import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Customer from "../model/customer";
import { apiCallBegan } from "./apis";
import { Api, RequestFailed, RequestMethod } from "./middleware/apiMiddleware";

interface CustomerPayload {
  data: Customer[];
  selected: Customer | null;
  api: Api;
  dialogs: {
    addDialogVisibile: boolean;
    editDialogVisible: boolean;
    deleteDialogVisible: boolean;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
  };
}

const initialState: CustomerPayload = {
  data: [],
  selected: null,
  dialogs: {
    addDialogVisibile: false,
    editDialogVisible: false,
    deleteDialogVisible: false,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
  api: {
    get: {
      isLoading: true,
      errorMessage: null,
    },
    post: {
      isLoading: false,
      errorMessage: null,
    },
    patch: {
      isLoading: false,
      errorMessage: null,
    },
  },
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customerSelected: (state, action: PayloadAction<Customer>) => {
      const index = state.data.findIndex(
        (customer) => customer.rowKey === action.payload.rowKey
      );
      state.selected = state.data[index];
    },

    // CALLING API
    customersRequested: (state, action: PayloadAction<RequestMethod>) => {
      if (action.payload.method in state.api) {
        state.api[action.payload.method]!.isLoading = true;
      }
    },

    customersRequestFailed: (state, action: PayloadAction<RequestFailed>) => {
      const { errorMessage, method } = action.payload;
      if (method in state.api) {
        const api = state.api[method];
        api!.isLoading = false;
        api!.errorMessage = errorMessage || "Unexpected error";
      }
    },

    customerRequestPostSucceeded: (state, action: PayloadAction<Customer>) => {
      state.api.post = {
        isLoading: false,
        errorMessage: null,
      };
      state.data.push(action.payload);
    },
    customerRequestPatchSucceeded: (state, action: PayloadAction<Customer>) => {
      //Figure out patch :)
      state.api.patch = {
        isLoading: false,
        errorMessage: null,
      };
    },

    customersRequestSucceeded: (state, action: PayloadAction<Customer[]>) => {
      state.api.get = {
        isLoading: false,
        errorMessage: null,
      };
      state.data = action.payload;
    },

    // DIALOGS
    customerAddDialogShowed: (state) => {
      state.dialogs.addDialogVisibile = true;
      state.dialogs.deleteDialogVisible = false;
      state.dialogs.editDialogVisible = false;
    },
    customerAddDialogCanceled: (state) => {
      state.dialogs.addDialogVisibile = false;
      state.api.post.errorMessage = null;
    },

    customerEditDialogShowed: (state) => {
      state.dialogs.editDialogVisible = true;
    },

    customerDeleteDialogShowed: (state) => {
      state.dialogs.deleteDialogVisible = true;
    },

    customerDialogsCancel: (state) => {
      state.dialogs = {
        addDialogVisibile: false,
        editDialogVisible: false,
        deleteDialogVisible: false,
      };
    },

    // Pagination
    customerCurrentPaginationPageChanged: (
      state,
      action: PayloadAction<number>
    ) => {
      state.pagination.currentPage = action.payload;
    },
    customerPaginationPageSizeChanged: (
      state,
      action: PayloadAction<number>
    ) => {
      state.pagination.pageSize = action.payload;
    },
  },
});

export const {
  customerRequestPostSucceeded,
  customerSelected,
  customersRequested,
  customersRequestFailed,
  customersRequestSucceeded,
  customerAddDialogShowed,
  customerDeleteDialogShowed,
  customerDialogsCancel,
  customerEditDialogShowed,
  customerCurrentPaginationPageChanged,
  customerPaginationPageSizeChanged,
  customerRequestPatchSucceeded,
  customerAddDialogCanceled,
} = customerSlice.actions;

export const postCustomer = (customer: Customer) => {
  return apiCallBegan({
    method: "post",
    url: "customers",
    data: customer,
    onErrorActionNames: [customersRequestFailed.type],
    onStartActionNames: [customersRequested.type],
    onSuccessActionNames: [
      customerRequestPostSucceeded.type,
      customerDialogsCancel.type,
    ],
  });
};

export default customerSlice.reducer;
