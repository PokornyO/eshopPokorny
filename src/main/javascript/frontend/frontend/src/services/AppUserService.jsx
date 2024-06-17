import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/app-user";

export const listAppUsers = () => axios.get(REST_API_BASE_URL, {
    headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`
    }
});
export const getAppUser = (id) => axios.get(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`
    }
});
export const createAppUser = (appUser) => axios.post(REST_API_BASE_URL, appUser);
export const updateAppUser = (id, appUser) => axios.put(REST_API_BASE_URL + `/${id}`, appUser, {
    headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`
    }
});
export const deleteAppUser = (id) => axios.delete(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`
    }
});
export const getCount = () => axios.put(REST_API_BASE_URL + "/count", {
    headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`
    }
});
export const isEmailAvailable = (email) => axios.get(REST_API_BASE_URL + "/email",
    {params: {email}})
export const isUsernameAvailable = (username) => axios.get(REST_API_BASE_URL + "/username",
    {params: {username}})