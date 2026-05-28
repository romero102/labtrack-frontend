import axios from "./axios"

export const loginRequest = (user) => axios.post(`/auth/login`, user)

export const logoutRequest = () => axios.post(`/auth/logout`)

export const verifyTokenRequest = () => axios.get("/auth/verify")


export const getLabsRequest = () => axios.get(`/labs`)

export const getLabRequest = (id) => axios.get(`/labs/${id}`)

export const getMyLabsRequest = () => axios.get(`labs/mylaboratories`)

export const createLabRequest = (lab) => axios.post(`/labs`, lab)

export const updateLabRequest = (id, lab) => axios.put(`/labs/${id}`, lab)

export const deleteLabRequest = (id) => axios.delete(`/labs/${id}`)


export const getComputersRequest = () => axios.get(`/computers`)

export const getComputerRequest = (id) => axios.get(`/computers/${id}`)

export const getComputerByLabRequest = (id) => axios.get(`/computers/lab/${id}`)

export const createComputerRequest = (computer) => axios.post(`/computers`, computer)

export const updateComputerRequest = (id, computer) => axios.put(`/computers/${id}`, computer)

export const deleteComputerRequest = (id) => axios.delete(`/computers/${id}`)


export const getAllMaintenanceRequest = () => axios.get(`/maintenance`)

export const getMyMaintenanceRequest = () => axios.get("/maintenance/mymaintenance");

export const getMaintenanceRequest = (id) => axios.get(`/maintenance/${id}`)

export const createMaintenanceRequest = (mintenance) => axios.post(`/maintenance`, mintenance)

export const updateMaintenanceRequest = (id, mintenance) => axios.put(`/maintenance/${id}`, mintenance)

export const deleteMaintenanceRequest = (id) => axios.delete(`/maintenance/${id}`)


export const getUsersRequest = () => axios.get(`/users`)

export const getUserRequest = (id) => axios.get(`/users/${id}`)

export const createUserRequest = (user) => axios.post(`/users`, user)

export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user)

export const deleteUserRequest = (id) => axios.put(`/users/deactive/${id}`)

export const restoreUserRequest = (id) => axios.put(`/users/restore/${id}`)

