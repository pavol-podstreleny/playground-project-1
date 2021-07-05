import Customer from "../model/customer";

export function getFakeCustomers(): Customer[] {
  return [
    {
      rowKey: "asdlfkjalskdfj",
      partitionKey: "asdfasdfasdf",
      firstName: "Pavol",
      lastName: "Podstreleny",
      email: "palo.fake@gmail.com",
      postalCode: "02601",
      age: 12,
      city: "Dolny Kubin",
    },
    {
      rowKey: "adfasdfasdfasdfoadf",
      partitionKey: "llkjlkjlkjlj",
      firstName: "Juraj",
      lastName: "Podstreleny",
      email: null,
      postalCode: "02601",
      age: 12,
      city: "Breza",
    },
  ];
}
