import axios from 'axios'



const axiosInterceptors = () => {

    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });



    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (err) => {
            if (err.response.status == 401) {
                window.location.replace('/login')
            }
            return Promise.reject(err)
        }
    )
}

export default axiosInterceptors