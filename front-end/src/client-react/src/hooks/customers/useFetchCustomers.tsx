import { useEffect } from "react";
import Customer from "../../model/customer";
import { apiCallBegan, Request } from "../../store/apis";
import {
  customersRequested,
  customersRequestFailed,
  customersRequestSucceeded,
} from "../../store/customers";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

const customerPayload: Request = {
  url: "/customers",
  method: "get",
  onErrorActionNames: [customersRequestFailed.type],
  onStartActionNames: [customersRequested.type],
  onSuccessActionNames: [customersRequestSucceeded.type],
};

export const useFetchCustomers = (): [
  Customer[],
  boolean,
  string | null,
  () => void
] => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.entities.customers.data);
  const isLoading = useAppSelector(
    (state) => state.entities.customers.api.get.isLoading
  );
  const errorMessage = useAppSelector(
    (state) => state.entities.customers.api.get.errorMessage
  );

  console.log(errorMessage);

  const refetch = () => {
    dispatch(apiCallBegan(customerPayload));
  };

  useEffect(() => {
    dispatch(apiCallBegan(customerPayload));
  }, []);

  return [customers, isLoading, errorMessage, refetch];
};
