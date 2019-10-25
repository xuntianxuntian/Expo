import axios from 'axios'

const Authorization = (token) =>{
    if(token.tirm !== ''){
        axios.defaults.headers.common['Ahtorization'] = token
    }else{
        delete  axios.defaults.headers.common['Ahtorization']
    }

}

export default Authorization