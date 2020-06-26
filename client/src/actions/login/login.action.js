import { LOGIN_IN, LOGIN_ERROR, STOP_LOADING } from '../types'
import $axios from '../../axios'
import axios from 'axios'
// import store from '../../store'
import jwt_decode from 'jwt-decode'
import setAuthorization from '../../utils/setAuthorization'

const loginUser = (userData, history) => async (dispatch) => {
    await $axios.post('/api/login', true, userData)
        .then(res => {
            dispatch({
                type: STOP_LOADING
            })
            const { token } = res.data
            const decode = jwt_decode(token)
            //检查用户权限  如果是管理员 则切换到管理员页面
            if(decode.handler === 'ADMIN'){
                return history.push('/admin')
            }
            if (token) {
                localStorage.setItem('token', token)
                localStorage.setItem('expoCID', JSON.stringify(decode.expoCID))
                localStorage.setItem('currentExpoCID', decode.currentExpoCID)
                setAuthorization(token)
                //获取展位信息  将展位列表持久化到localStorage中
                axios.get('/api/booth/listAll', { params: { cid: decode.currentExpoCID } })
                    .then(
                        res => {
                            console.log(res.data)
                            let boothList = []
                            if (res.data.length) {
                                res.data.forEach((booth, index) => {
                                    booth['key'] = index
                                    const {boothName,key,boothId ,info} = booth
                                    boothList.push({boothName,key,boothId ,info})
                                })
                                localStorage.setItem('boothList',JSON.stringify(boothList))
                            } else {
                                localStorage.setItem('boothList',JSON.stringify([]))
                            }
                        })
                    .catch(err => {
                        console.log(err)
                    })
                dispatch({
                    type: LOGIN_IN,
                    payload: decode
                })
                history.push('/')
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
                type: STOP_LOADING
            })
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data
            })
        })
}

export default loginUser