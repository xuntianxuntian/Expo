import axios from 'axios'



const axiosInterceptors = () =>{
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (err) =>{
            window.location.replace('/login')
            return Promise.reject(err)
        }
    )
}

export default axiosInterceptors