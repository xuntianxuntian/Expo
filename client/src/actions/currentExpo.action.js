import { SWITCH_OPERATE_EXPO } from './types'
import axios from 'axios'

const currentExpo = (cid) => (dispatch) => {
    dispatch(
        {
            type:SWITCH_OPERATE_EXPO,
            payload:cid
        }
    )
    localStorage.setItem('currentExpoCID',cid)
    axios.put('/api/user/currentExpo',{cid})
    .then(res=>{
        console.log('redux_action_switchCurrentExpo_success')
    }).catch(err=>{
        console.log(err)
    })
}

export default currentExpo