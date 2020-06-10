import { LOGIN_IN, LOGIN_ERROR } from '../../actions/types'
import currentExpo from '../../actions/currentExpo.action';


const initialState = {
    isAuthorized : false,
    // token:'',
    user:{},
    error:{},
    currentExpoCID:''
}
export const loginReducer = (state = initialState,action) => {
    
    switch(action.type){
        case LOGIN_IN:
            return {...state,
                isAuthorized:( action.payload === null || action.payload === undefined || action.payload === '')?false:true,
                // token : action.payload.token,
                user : action.payload,
                error : {},
                currentExpoCID:action.payload.currentExpoCID
            }
        case LOGIN_ERROR:
            return  {...state,
                isAuthorized:false,
                // token : '',
                user : {},
                error : action.payload
            }  
        default:
            return initialState
    }
}