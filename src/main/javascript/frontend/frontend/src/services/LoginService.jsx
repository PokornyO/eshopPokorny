import axios from "axios";


const REST_API_BASE_URL = "http://localhost:9000/api/v1/auth";

export const getLogin = (loginResponse) => axios.post(REST_API_BASE_URL + "/login", loginResponse);