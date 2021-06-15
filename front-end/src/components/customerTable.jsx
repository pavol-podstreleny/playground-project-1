import React, { Component } from "react";
import getFakeCustomers from "../services/fakeCustomerApi";

export default class CustomerTable extends Component {
  state = {
    customers: getFakeCustomers(),
  };
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Postal Code</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {this.state.customers.map((customer) => {
            return (
              <tr>
                <td>{customer.FirstName}</td>
                <td>{customer.LastName}</td>
                <td>{customer.Email}</td>
                <td>{customer.PostalCode}</td>
                <td>{customer.Age}</td>
                <td>{customer.City}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
