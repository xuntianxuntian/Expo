import { LOGIN_IN, LOGIN_ERROR, STOP_LOADING } from '../types'
import $axios from '../../axios'
import axios from 'axios'
// import store from '../../store'
import jwt_decode from 'jwt-decode'

const loginUser = ({ email, password }) => async (dispatch) => {
    return new Promise(
        (resolve, reject) => {
            $axios.post('/api/auth/login/pwd', true, { username: email, password })
                .then( async res => {
                    if (res.status == 200) {
                        const { token } = res.data
                        if (token) {
                            const decode = jwt_decode(token)
                            //检查用户权限  如果是管理员 则切换到管理员页面
                            if (decode.handler === 'MANAGER') {
                                return window.location.replace('/admin')
                            }
                            const { current, list } = decode.expos
                            localStorage.setItem('token', token)
                            localStorage.setItem('default_template', decode.defTemp)
                            localStorage.setItem('expos', JSON.stringify(list))
                            //获取展位信息  将展位列表持久化到localStorage中
                            if (current) {
                                localStorage.setItem('current_eid', current)
                                await axios.get(`/api/user/booth/list/${current}`)
                                    .then(
                                        res => {
                                            let boothList = []
                                            const booths = res.data.boothList
                                            if (booths) {
                                                boothList = booths.map((b, index) => {
                                                    let _b = { ...b }
                                                    delete _b.bName
                                                    _b.bName = b.bName.fullName
                                                    return { ..._b, key: index }
                                                })
                                                localStorage.setItem('boothList', JSON.stringify(boothList))
                                            } else {
                                                localStorage.setItem('boothList', JSON.stringify([]))
                                            }
                                        })
                            }
                            dispatch({
                                type: LOGIN_IN,
                                payload: decode
                            })
                            resolve('登录成功')
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                    reject(err.response.data)
                })
        }
    )
}

export default loginUser