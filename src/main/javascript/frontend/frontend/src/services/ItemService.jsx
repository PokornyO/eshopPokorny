import axios from "axios";
import Cookies from "js-cookie";
const REST_API_BASE_URL = "http://localhost:9000/api/v1/products";

export const listItems = () => axios.get(REST_API_BASE_URL, {

});