import { SWITCH_OPERATE_EXPO } from './types'
import axios from 'axios'

const currentExpo = (eid) => (dispatch) => {
    dispatch(
        {
            type: SWITCH_OPERATE_EXPO,
            payload: eid
        }
    )
    axios.post(`/api/user/expo/current/${eid}`)
        .then(res => {
            localStorage.setItem('current_eid', eid)
        }).catch(err => {
            console.log(err)
        })
}

export default currentExpo