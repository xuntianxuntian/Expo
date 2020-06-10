import { ADD_TO_INFOTEMPLIST, DELETE_TO_INFOTEMPLIST, GET_INFOTEMPLIST,CHANGE_DEFAULT_TO_INFOTEMPLIST } from './types'
import axios from 'axios';


export const getInfoTempList =() => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await axios.get('/api/booth/infoTemp')
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch({
                            type: GET_INFOTEMPLIST,
                            payload: res.data.infoTempList
                        })
                        console.log('res')
                        console.log(res)
                        resolve(res.data.infoTempList)
                    } else {
                        reject(new Error('未查询到信息模板!'))
                    }
                }
            ).catch(err => {
                console.log(err)
                reject(err)
            })
    })

}


export const addToInfoTempList = (infoTemp) => async (dispatch) => {
    await axios.post('/api/booth/infoTemp', { infoTemp })
        .then(
            res => {
                if (res.status === 200) {
                    dispatch({
                        type: ADD_TO_INFOTEMPLIST,
                        payload: res.data.infoTempList
                    })
                } else {
                    throw new Error('无法添加信息模板!')
                }
            }
        ).catch(err => {
            console.log(err)
        })
}

export const changeDefaultToInfoTempList = (list) =>(dispatch) => {
    return new Promise(async (resolve, reject) => {
        await axios.put('/api/booth/infoTemp',list)
            .then(
                res => {
                    if (res.status === 200) {
                        dispatch({
                            type: CHANGE_DEFAULT_TO_INFOTEMPLIST,
                            payload: res.data.infoTempList
                        })
                        resolve(res.data.infoTempList)
                    } else {
                        reject(new Error('未查询到信息模板!'))
                    }
                }
            ).catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

export const deleteToInfoTempList = (infoTemp) => async (dispatch) => {

    await axios.delete('/api/booth/infoTemp', { infoTemp })
        .then(
            res => {
                if (res.status === 200) {
                    dispatch({
                        type: DELETE_TO_INFOTEMPLIST,
                        payload: res.data.infoTempList
                    })
                } else {
                    throw new Error('无法删除信息模板!')
                }
            }
        ).catch(err => {
            console.log(err)
        })

}
