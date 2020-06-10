import {SWITCH_OPERATE_EXPO} from '../actions/types'

const initialstate = {OperateExpo : ''}

export const switchOperateExpo = (state = initialstate,action) => {
    switch(action.type){
        case SWITCH_OPERATE_EXPO:
            return {
                ...state,
                OperateExpo:action.payload
            }
    }
    return initialstate
}