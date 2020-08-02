import axios from "axios";

const apiClient = axios.create({

    baseURL: process.env.VUE_APP_GOREST_BASE_URL,

    headers: {

        Accept:
            "application/json",
            "Content-Type": "application/json"
    }

});

/*

   Use the token for all requests

 */
apiClient.interceptors.request.use(config => {

    const token = process.env.VUE_APP_GOREST_TOKEN || '';
    config.headers.Authorization = `Bearer ${token}`;

    return config;

});

apiClient.interceptors.response.use( response => {

        if(response?.data?._meta?.success) { return response; }

        if(response?.data?._meta?.success === false) {
            return Promise.reject(response?.data);
        }

    }, error => {

          return Promise.reject(error);
    });



export default {

    users: {

        getUsers(page) {
            const url = `users?page=${page}&status=active`;
            return apiClient.get(url);
        },
        getUser(id) {
            const url = `users/${id}`;
            return apiClient.get(url);
        },

        searchUser(param)
        {
            const url = `users?page=${param.page}&status=active&${param.query}=${param.value}`;
            return apiClient.get(url);

        }
    }
}