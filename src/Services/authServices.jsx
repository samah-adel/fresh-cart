import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

// login api
export function login(data) {
  return axios.post(`${BASE_URL}/signin`, data);
}

//register api
export function register(data) {
  return axios.post(`${BASE_URL}/signup`, data);
}

//forget password api
export function forgotPasswords(data) {
  return axios.post(`${BASE_URL}/forgotPasswords`, data);
}

// verify api
export function verifyResetCode(data) {
  return axios.post(`${BASE_URL}/verifyResetCode`, data);
}

//resetPassword api
export function resetPassword(data) {
  return axios.put(`${BASE_URL}/resetPassword`, data);
}
