import { LOGIN_IN,LOGIN_ERROR } from '../types'
import axios from 'axios'
import setAuthorization from '../../utils/setAuthorization'

const loginUser = (userData) => dispatch => {
    console.log('assssssss')
    axios.post('/login', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('token', token)
            setAuthorization(token)
            dispatch({
                type: LOGIN_IN,
                payload: token
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: LOGIN_ERROR,
                payload: err.data
            })
        })
}

export default loginUser