import Axios from 'axios';

export const config = {
    // REACT_APP_API_URL: 'http://127.0.0.8',
    REACT_APP_API_URL: '/api'
}

export const AxiosInstance = Axios.create({
    baseURL: `${config.REACT_APP_API_URL}`,
    timeout: 10000,
    headers: {
        contentType: "application/json"
    }
})

export const AJAXRequest = (URL: string, options: any): any => {
    return AxiosInstance.post(`/${URL}`, options);
}