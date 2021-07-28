import { useEffect } from "react";
import Customer from "../../model/customer";
import { getCustomers } from "../../store/customers";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

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

  const refetch = () => {
    dispatch(getCustomers());
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  return [customers, isLoading, errorMessage, refetch];
};
