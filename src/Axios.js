import a from "axios"

let config = require('./config.json');

const baseurl = `${config.host}/api`;

const Axios = a.create({
    baseURL: baseurl
});

Axios.interceptors.request.use(config => {
    if (config.url !== '/user/login' && config.url !== '/user/register') {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken)
            config.headers["Authorization"] = `Bearer ${accessToken}`;

        // const handleData = (data) => {
        //     if (typeof data == "object") {
        //         if (Array.isArray(data)) {
        //             data.map((obj) => handleData(obj))
        //         }
        //         else {
        //             Object.entries(data).map(([key, value]) => {
        //                 handleData(value);
        //                 if (/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/.test(value)) { //type date
        //                     value = new Date(value);
        //                     const year = value.getFullYear();
        //                     const month = value.getMonth() + 1;
        //                     const day = value.getDate();
        //                     data[key] = `${year}-${month}-${day}`;
        //                 }
        //             });
        //         }
        //     }
        // }

        // if (config.data) {
        //     handleData(config.data);
        // }

    }

    return config;
});

Axios.interceptors.response.use(
    (response) => {
        // const handleData = (data) => {
        //     if (typeof data == "object") {
        //         if (Array.isArray(data)) {
        //             data.map((obj) => handleData(obj))
        //         }
        //         else {
        //             Object.entries(data).map(([key, value]) => {
        //                 handleData(value);
        //                 if (/^(\d{4}-\d{2}-\d{2})$/.test(value)) { //type date
        //                     data[key] = new Date(value);
        //                 }
        //             });
        //         }
        //     }
        // }
        
        // if (response.data) {
        //     handleData(response.data);
        // }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;