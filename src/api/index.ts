import axios from "axios";
import {OutlayRowRequest, OutlayRowUpdateRequest} from "../models";

const {REACT_APP_API_ENDPOINT} = process.env;
const {REACT_APP_EID} = process.env;

axios.defaults.baseURL = REACT_APP_API_ENDPOINT;
const instance = axios.create();

export const deleteRow = (rId: number) => {
    return axios.delete(`v1/outlay-rows/entity/${REACT_APP_EID}/row/${rId}/delete`);
}

export const getTreeData = () => {
    return axios.get(`v1/outlay-rows/entity/${REACT_APP_EID}/row/list`);
}

export const createRow = (data: OutlayRowRequest) => {
    return axios.post(`v1/outlay-rows/entity/${REACT_APP_EID}/row/create`, data);
};

export const updateRow = (rId: number, data: OutlayRowUpdateRequest) => {
    return axios.post(`/v1/outlay-rows/entity/${REACT_APP_EID}/row/${rId}/update`, data);
}


export default instance;