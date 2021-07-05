export default interface Customer {
  rowKey: string;
  partitionKey: string;
  firstName: string;
  lastName: string;
  email: string | null;
  postalCode: string;
  age: number;
  city: string;
  [state: string]: string | null | number;
}
