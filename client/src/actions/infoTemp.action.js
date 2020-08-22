import { ADD_TO_TEMPLIST, DELETE_FROM_TEMPLIST, GET_DEFTEMP, GET_TEMPLIST, CHANGE_DEFTEMPLATE } from './types'
import axios from 'axios';


export const getTempList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/user/template')
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch({
                            type: GET_TEMPLIST,
                            payload: res.data.tempList
                        })
                        resolve(res.data.tempList)
                    } else {
                        reject(new Error('未查询到信息模板!'))
                    }
                }
            ).catch(err => {
                reject(err)
            })
    })

}


export const addToTempList = (template) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/api/user/template', { template })
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch({
                            type: ADD_TO_TEMPLIST,
                            payload: res.data.template
                        })
                        resolve(res.data.template)
                    } else {
                        reject(new Error('添加信息模板失败!'))
                    }
                }
            ).catch(err => {
                reject(err)
            })
    })
}

export const changeDefTemplate = (tid) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.put('/api/user/defTemp', { tid })
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch({
                            type: CHANGE_DEFTEMPLATE,
                            payload: res.data.template
                        })
                        resolve(res.data.template)
                    } else {
                        reject(new Error('未查询到信息模板!'))
                    }
                }
            ).catch(err => {
                reject(err)
            })
    })
}

export const deleteFromTempList = (tid) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/user/template?tid=${tid}`)
            .then(
                res => {
                    if (res.status === 200) {
                        getTempList().then(
                            tempList => {
                                dispatch({
                                    type: DELETE_FROM_TEMPLIST,
                                    payload: tempList
                                })
                                resolve(res.data.tempList)
                            }
                        ).catch(err => reject(err))
                    } else {
                        reject(new Error('无法删除信息模板!'))
                    }
                }
            ).catch(err => {
                reject(err)
            })
    })
}


export const getDefTemp = (tid) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/user/defTemp`)
            .then(
                res => {
                    if (res.status === 200) {
                        // dispatch({
                        //     type: GET_DEFTEMP,
                        //     payload: res.data.template
                        // })
                        resolve(res.data.template)
                    } else {
                        reject(new Error('无法删除信息模板!'))
                    }
                }
            ).catch(err => {
                reject(err)
            })
    })
}
