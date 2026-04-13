import axios from "axios"

const API = "http://localhost:5000/api"

export const loginRequest = (user) => axios.post(`${API}/auth/login`, user)

export const getLabsRequest = () => axios.get(`${API}/labs`)