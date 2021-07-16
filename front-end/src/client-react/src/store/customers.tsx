import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Customer from "../model/customer";

interface CustomerPayload {
  data: Customer[];
  selected: Customer | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: CustomerPayload = {
  data: [],
  selected: null,
  isLoading: true,
  errorMessage: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customersAdded: (state, action: PayloadAction<Customer[]>) => {
      state.data = action.payload;
    },

    customerSelected: (state, action: PayloadAction<Customer>) => {
      const index = state.data.findIndex(
        (customer) => customer === action.payload
      );
      state.selected = state.data[index];
    },

    customersRequested: (state) => {
      state.isLoading = true;
    },

    customersRequestFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },

    customersRequestSucceeded: (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
});

export const {
  customersAdded,
  customerSelected,
  customersRequested,
  customersRequestFailed,
  customersRequestSucceeded,
} = customerSlice.actions;

export default customerSlice.reducer;
