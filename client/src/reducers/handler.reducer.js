import { HANDLER_TOOGLE } from '../actions/types'
import isEmpty from '../../utils/isEmpty'


const initialState = {
    handler:'USER'
}
export const registerReducer = (state = initialState,action) => {

    switch(action.type){
        case REGISTER_USER:
            return {...state,
                handler:action.payload
            }
        default:
            return state
    }
}