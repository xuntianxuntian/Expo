import { LOGIN_IN,LOGIN_ERROR } from '../../actions/types'



const initialState = {
    isAuthorized : false,
    token:'',
    err:{}
}
export const loginReducer = (state = initialState,action) => {
    switch(action.type){
        case LOGIN_IN:
            return {...state,
                token : action.payload
            }
        case LOGIN_ERROR:
            return {...state,
                err:action.payload
            }
        default:
            return state
    }
}