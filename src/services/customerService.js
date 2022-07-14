import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/customers";

function customerUrl(sessionId, clientId, customerId) {
  return `${apiEndpoint}/${sessionId}/${clientId}/${customerId}`;
}

export function getCustomers(sessionId, clientId) {
  return http.get(`${apiEndpoint}/${sessionId}/${clientId}`);
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
