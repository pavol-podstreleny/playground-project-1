import React from "react";
import { Card } from "./components/card";
import { CustomerTable } from "./customerTable";
import { Centered } from "./components/center";
import { PrimaryButton } from "./components/primarybutton";
import styled from "styled-components";

const StyledCustomerListSection = styled.section`
  & h1 {
    font-family: "Open Sans", sans-serif;
    padding: 20px 0px 0px 16px;
    font-size: 1.5rem;
  }
`;

export const CustomerListSection = () => {
  return (
    <Centered>
      <PrimaryButton>Add Customer</PrimaryButton>
      <StyledCustomerListSection>
        <Card>
          <h1>Customers</h1>
          <CustomerTable />
        </Card>
      </StyledCustomerListSection>
    </Centered>
  );
};
