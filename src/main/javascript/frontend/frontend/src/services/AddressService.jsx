import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/address";

export const getAddress = (id) => axios.get(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
    }
});
export const addAddressUser = (id, address) => axios.post(REST_API_BASE_URL+"/user" + `/${id}`, address, {

});
export const addAddress = (address) => axios.post(REST_API_BASE_URL, address, {
    headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`
    }
});