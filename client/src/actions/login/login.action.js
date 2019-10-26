import { LOGIN_IN,GET_ERROR } from '../types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthorization from '../../utils/setAuthorization'

const loginUser = (userData,history) => dispatch => {
    axios.post('/login', userData)
        .then(res => {
            const { token } = res.data
            const decode = jwt_decode(token)
            if(token){
                localStorage.setItem('token', token)
                setAuthorization(token)
                dispatch({
                    type: LOGIN_IN,
                    payload: {
                        token,
                        decode
                    }
                })
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err.response.data)
            // if(err.response.data){
            //     const token = localStorage.token?localStorage.token:''
            //     delete localStorage.token
            //     setAuthorization(token)
            // }
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}

export default loginUser