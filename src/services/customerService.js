import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}