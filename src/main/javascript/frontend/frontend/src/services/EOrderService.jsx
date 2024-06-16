import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/orders";

export const createOrder = (order) => axios.post(REST_API_BASE_URL, order, {
    headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
    }
});
export const getOrder = (id) => axios.get(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
    }
});
export const listOrders = () => axios.get(REST_API_BASE_URL, {
    headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
    }
});
export const getByUserId = (id) => axios.get(REST_API_BASE_URL + "/user" + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
    }
});