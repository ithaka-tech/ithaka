import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/customers";

function customerUrl(sessionId, customerId) {
  return `${apiEndpoint}/${sessionId}/${customerId}`;
}

export function getCustomers(sessionId) {
  return http.get(`${apiEndpoint}/${sessionId}`);
}

export function getCustomer(sessionId, customerId) {
  return http.get(customerUrl(sessionId, customerId));
}

export function saveCustomer(sessionId, customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(sessionId, customer._id), body);
  }

  return http.post(`${apiEndpoint}/${sessionId}`, customer);
}

export function deleteCustomer(sessionId, customerId) {
  return http.delete(customerUrl(sessionId, customerId));
}
