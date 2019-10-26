import { REGISTER_USER, REGISTER_ERROR } from '../../actions/types'
import isEmpty from '../../utils/isEmpty'


const initialState = {
    success:false,
    user:{},
    error:{}
}
export const registerReducer = (state = initialState,action) => {

    switch(action.type){
        case REGISTER_USER:
            return {...state,
                success:isEmpty(action.payload)?false:true,
                user : action.payload,
                error : {}
            }
        case REGISTER_ERROR:
            return  {...state,
                success:false,
                user : {},
                error : action.payload
            }  
        default:
            return state
    }
}