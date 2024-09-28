import axios, { type AxiosResponse } from "axios";
import { locale } from "svelte-i18n";

locale.subscribe((value) => {
  axios.defaults.headers["Accept-Language"] = value ?? "en";
});

export const signup = (body): Promise<AxiosResponse> => {
  return axios.post("/api/1.0/users", body);
};

export const activate = (token: string): Promise<AxiosResponse> => {
  return axios.post(`/api/1.0/users/token/${token}`);
};

export const loadUsers = (page = 0): Promise<AxiosResponse> => {
  return axios.get(`/api/1.0/users`, {params: {page, size: 3}});
};

const auth = {
  signup,
  activate,
  loadUsers,
};

export default auth;
