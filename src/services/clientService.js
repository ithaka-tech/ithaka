import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/clients";

export function register(client) {
  return http.post(apiEndpoint, {
    name: client.name,
    email: client.email,
    password: client.password,
  });
}
