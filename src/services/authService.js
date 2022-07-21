import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/logins";
const tokenKey = "token";

http.setJwt(getJwt());

export async function signin(email, password) {
  const response = await http.post(apiEndpoint, { email, password });
  const jwt = response.data.sessionId;
  localStorage.setItem(tokenKey, jwt);
}

export function signinWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function signout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentClient() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  signin,
  signinWithJwt,
  signout,
  getCurrentClient,
  getJwt,
};
