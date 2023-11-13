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
    }

    return config;
});

export default Axios;