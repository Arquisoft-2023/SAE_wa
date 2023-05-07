import Axios from 'axios';
import React from 'react'

export const AxiosInstance = Axios.create({
    baseURL: "http://127.0.0.8:3121/remisiones/remisiones",
    timeout: 10000,
    headers: {
        contentType: "application/json"
    }
})

export const AJAXRequest = (options) => {
    return AxiosInstance.post("",options);
}