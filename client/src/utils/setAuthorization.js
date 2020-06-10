import axios from 'axios'

const Authorization = (token) =>{
    if(token.tirm !== ''){
        axios.defaults.headers.common['Authorization'] = token
    }else{
        delete  axios.defaults.headers.common['Authorization']
    }

}

export default Authorization