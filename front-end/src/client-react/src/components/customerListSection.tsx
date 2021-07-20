import React from "react";
import Card from "./common/cards/card";
import PageSizeSelector from "./common/pagination/pageSizeSelector";
import Pagination from "./common/pagination/pagination";
import CustomerDialogAdd from "./customerDialogAdd";
import CustomerDialogDelete from "./customerDialogDelete";
import CustomerDialogEdit from "./customerDialogEdit";
import CustomerTable from "./customerTable";
import TryAgain from "./common/errors/tryAgain";
import { useFetchCustomers } from "../hooks/customers/useFetchCustomers";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  customerAddDialogShowed,
  customerCurrentPaginationPageChanged,
  customerPaginationPageSizeChanged,
} from "../store/customers";
import Loader from "./common/loading/loader";
import { useAppSelector } from "../hooks/useAppSelector";

const pageOptions = [1, 2, 5, 10, 25, 50, 100];

export const CustomerListSection = () => {
  const [customers, isLoading, errorMessages, refetch] = useFetchCustomers();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(
    (state) => state.entities.customers.pagination.currentPage
  );
  const pageSize = useAppSelector(
    (state) => state.entities.customers.pagination.pageSize
  );

  const handlePageChange = (pageNumber: number) => {
    dispatch(customerCurrentPaginationPageChanged(pageNumber));
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(customerCurrentPaginationPageChanged(1));
    dispatch(customerPaginationPageSizeChanged(pageSize));
  };

  const handleAddCustomerButtonClick = () => {
    dispatch(customerAddDialogShowed());
  };

  console.log("error messagea");
  console.log(errorMessages);
  if (errorMessages) {
    return (
      <div className="force-center">
        <TryAgain onClick={refetch} />
      </div>
    );
  }

  if (isLoading) {
    return <Loader text="Loading..." />;
  }

  if (!customers) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="customer-list">
        <div className="center">
          <button
            className="button button-primary"
            onClick={handleAddCustomerButtonClick}
          >
            Add Customer
          </button>
          <Card>
            <h1>Customers</h1>
            <CustomerTable
              customers={customers}
              pagination={{
                pageNumber: currentPage,
                pageSize: pageSize,
              }}
            />
          </Card>
        </div>
        <Pagination
          itemsCount={customers.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <PageSizeSelector
          actualPageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          pageOptions={pageOptions}
        />
      </section>
      <CustomerDialogDelete />
      <CustomerDialogEdit />
      <CustomerDialogAdd />
    </React.Fragment>
  );
};
