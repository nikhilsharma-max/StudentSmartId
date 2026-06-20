import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true
});

// REQUEST INTERCEPTOR

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        if(token){
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// RESPONSE INTERCEPTOR

api.interceptors.response.use(

    (response) => response,

    async(error) => {

        const originalRequest =
            error.config;
        if(
            originalRequest.url?.includes(
                "/auth/refresh"
            )
        ){
            return Promise.reject(error);
        }
        if(
            error.response?.status === 401 &&
            !originalRequest._retry
        ){

            originalRequest._retry =
                true;

            try{

                const refreshResponse =
                    await axios.post(
                        "http://localhost:8000/auth/refresh",
                        {},
                        {
                            withCredentials:true
                        }
                    );

                const newAccessToken =
                    refreshResponse.data.token;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(
                    originalRequest
                );

            }
            catch(refreshError){

                localStorage.removeItem(
                    "accessToken"
                );

                window.location.href =
                    "/login";

                return Promise.reject(
                    refreshError
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;