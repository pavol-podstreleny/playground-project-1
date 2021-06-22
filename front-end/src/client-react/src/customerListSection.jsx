import React from "react";
import { Card } from "./components/card";
import { CustomerTable } from "./customerTable";
import "./css/customerListSection.css";

export const CustomerListSection = () => {
  return (
    <section className="customer-list">
      <div className="center">
        <button className="button button-primary">Add Customer</button>
        <Card>
          <h1>Customers</h1>
          <CustomerTable />
        </Card>
      </div>
    </section>
  );
};
