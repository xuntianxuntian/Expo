import {  REGISTER_TO_LOGIN } from '../../actions/types'
import isEmpty from '../../utils/isEmpty'


const initialState = {tabKey:'1'}
export const registerToLogin = (state = initialState,action) => {

    switch(action.type){
        case REGISTER_TO_LOGIN:
            return {...state,
                tabKey:action.payload
            }
        default:
            return state
    }
}