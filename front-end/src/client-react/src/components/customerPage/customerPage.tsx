import React from "react";
import Card from "../common/cards/card";
import PageSizeSelector from "../common/pagination/pageSizeSelector";
import Pagination from "../common/pagination/pagination";
import CustomerDialogAdd from "../customerDialogAdd";
import CustomerDialogDelete from "../customerDialogDelete";
import CustomerDialogEdit from "../customerDialogEdit";
import CustomerTable from "../customerTable/customerTable";
import TryAgain from "../common/errors/tryAgain/tryAgain";
import { useFetchCustomers } from "../../hooks/customers/useFetchCustomers";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  customerAddDialogShowed,
  customerCurrentPaginationPageChanged,
  customerPaginationPageSizeChanged,
} from "../../store/customers";
import Loader from "../common/loading/loader";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./customerPage.css";

const pageOptions = [1, 2, 5, 10, 25, 50, 100];

export const CustomerPage = () => {
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
      <section className="customer-page">
        <div className="center">
          <Card>
            <div className="customer-header">
              <h1 className="customer-header__heading">Customers Table</h1>
              <div className="customer-header__action-group">
                <PageSizeSelector
                  actualPageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                  pageOptions={pageOptions}
                />
                <button
                  className="button button--success"
                  onClick={handleAddCustomerButtonClick}
                >
                  Add Customer
                </button>
              </div>
            </div>
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
      </section>
      <CustomerDialogDelete />
      <CustomerDialogEdit />
      <CustomerDialogAdd />
    </React.Fragment>
  );
};
