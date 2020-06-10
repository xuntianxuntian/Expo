import { REGISTER_USER,REGISTER_ERROR } from '../types'
import axios from 'axios'

const registerUser = (userData,history) => async(dispatch) => {
    await axios.post('/api/register', userData)
        .then(res => {
            if(res.data){
                dispatch({
                    type: REGISTER_USER,
                    payload: res.data
                })
                history.push('/login')
            }
        })
        .catch(err => {
            // console.log(err.response.data)
            // if(err.response.data){
            //     const token = localStorage.token?localStorage.token:''
            //     delete localStorage.token
            //     setAuthorization(token)
            // }
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response.data
            })
        })
}

export default registerUser