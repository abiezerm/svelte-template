import axios, { type AxiosResponse } from "axios";
import { locale } from "svelte-i18n";

locale.subscribe((value) => {
    axios.defaults.headers["Accept-Language"] = value ?? "en";
});


export const signup = (body): Promise<AxiosResponse> => {
    return axios.post("/api/1.0/users", body);
}