import Axios from 'axios';

export const config = {
    // REACT_APP_API_URL: 'http://127.0.0.8',
    REACT_APP_API_URL: '/api',
    REACT_APP_API_PORT: ''
}

export const AxiosInstance = Axios.create({
    baseURL: `${config.REACT_APP_API_URL}:${config.REACT_APP_API_PORT}`,
    timeout: 10000,
    headers: {
        contentType: "application/json"
    }
})

export const AJAXRequest = (URL: string, options: any): any => {
    return AxiosInstance.post(`${config.REACT_APP_API_URL}${config.REACT_APP_API_PORT}/${URL}`, options);
}