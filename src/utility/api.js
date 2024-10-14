import axios from "axios";

export const API = axios.create({baseURL:'https://5jiek.uz/api/v1', withCredentials:true});