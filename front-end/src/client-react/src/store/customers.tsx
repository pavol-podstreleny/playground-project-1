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
    detailDialogVisible: boolean;
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
    detailDialogVisible: false,
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
    delete: {
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
    customersRequestStarted: (state, action: PayloadAction<RequestMethod>) => {
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

    customerRequestDeleteSucceeded: (
      state,
      action: PayloadAction<Customer>
    ) => {
      state.api.delete = {
        isLoading: false,
        errorMessage: null,
      };
      const index = state.data.findIndex(
        (customer) => customer.rowKey === action.payload.rowKey
      );
      if (index >= 0 && index < state.data.length) {
        state.data.splice(index, 1);
      }
    },

    customerRequestPatchSucceeded: (state, action: PayloadAction<Customer>) => {
      state.api.patch = {
        isLoading: false,
        errorMessage: null,
      };
      const index = state.data.findIndex(
        (customer) => customer.rowKey === action.payload.rowKey
      );
      if (index >= 0 && index < state.data.length) {
        state.data[index] = action.payload;
      }
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

    customerDetailDialogShowed: (state) => {
      state.dialogs.detailDialogVisible = true;
    },

    customerDialogsCancel: (state) => {
      state.dialogs = {
        addDialogVisibile: false,
        editDialogVisible: false,
        deleteDialogVisible: false,
        detailDialogVisible: false,
      };
    },

    customerDialogsEditRemoveErrors: (state) => {
      state.api.patch.errorMessage = null;
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
  customerRequestDeleteSucceeded,
  customerSelected,
  customersRequestStarted,
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
  customerDialogsEditRemoveErrors,
  customerDetailDialogShowed,
} = customerSlice.actions;

export const getCustomers = () => {
  return apiCallBegan({
    url: "/customers",
    method: "get",
    onErrorActionNames: [customersRequestFailed.type],
    onStartActionNames: [customersRequestStarted.type],
    onSuccessActionNames: [customersRequestSucceeded.type],
  });
};

export const postCustomer = (customer: Customer) => {
  return apiCallBegan({
    method: "post",
    url: "customers",
    data: customer,
    onErrorActionNames: [customersRequestFailed.type],
    onStartActionNames: [customersRequestStarted.type],
    onSuccessActionNames: [
      customerRequestPostSucceeded.type,
      customerDialogsCancel.type,
    ],
  });
};

export const patchCustomer = (customer: Customer) => {
  return apiCallBegan({
    method: "patch",
    url: `customers/${customer.rowKey}/${customer.partitionKey}`,
    data: customer,
    onErrorActionNames: [customersRequestFailed.type],
    onStartActionNames: [customersRequestStarted.type],
    onSuccessActionNames: [
      customerRequestPatchSucceeded.type,
      customerDialogsCancel.type,
    ],
  });
};

export const detailCustomer = () => {
  return customerDetailDialogShowed;
};

export const deleteCustomer = (customer: Customer) => {
  return apiCallBegan({
    method: "delete",
    data: customer,
    url: `customers/${customer.rowKey}/${customer.partitionKey}/`,
    onErrorActionNames: [customersRequestFailed.type],
    onStartActionNames: [customersRequestStarted.type],
    onSuccessActionNames: [
      customerRequestDeleteSucceeded.type,
      customerDialogsCancel.type,
    ],
  });
};

export default customerSlice.reducer;
