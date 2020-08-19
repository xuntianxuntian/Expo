import { LOGIN_IN, LOGIN_ERROR, STOP_LOADING } from '../types'
import $axios from '../../axios'
import axios from 'axios'
// import store from '../../store'
import jwt_decode from 'jwt-decode'

const loginUser = ({ email, password }, history) => async (dispatch) => {
    await $axios.post('/api/auth/login/pwd', true, { username: email, password })
        .then(res => {
            dispatch({
                type: STOP_LOADING
            })
            const { token } = res.data
            if (token) {
                const decode = jwt_decode(token)
                //检查用户权限  如果是管理员 则切换到管理员页面
                if (decode._doc.handler === 'MANAGER') {
                    return window.location.replace('/admin')
                }
                const { current, list } = decode._doc.expos
                localStorage.setItem('token', token)
                localStorage.setItem('expos', JSON.stringify(list))
                //获取展位信息  将展位列表持久化到localStorage中
                if (current) {
                    localStorage.setItem('current_eid', current)
                    axios.get(`/api/user/booth/list/${current}`)
                        .then(
                            res => {
                                let boothList = []
                                const booth = res.data.booth
                                if (booth) {
                                    boothList = booth.map((b, index) => {
                                        let _b = { ...b }
                                        delete _b.bName
                                        _b.bName = b.bName.fullName
                                        return {..._b,key:index}
                                    })
                                    localStorage.setItem('boothList', JSON.stringify(boothList))
                                } else {
                                    localStorage.setItem('boothList', JSON.stringify([]))
                                }
                            })
                        .catch(err => {
                            console.log(err)
                        })
                }
                dispatch({
                    type: LOGIN_IN,
                    payload: decode
                })
                history.push('/')
            }
        })
        .catch(err => {
            dispatch({
                type: STOP_LOADING
            })
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response
            })
        })
}

export default loginUser