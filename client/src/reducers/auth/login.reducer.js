import { LOGIN_IN, GET_ERROR } from '../../actions/types'




const initialState = {
    isAuthorized : false,
    token:'',
    user:{},
    error:{}
}
export const loginReducer = (state = initialState,action) => {

    switch(action.type){
        case LOGIN_IN:
            return {...state,
                isAuthorized:( action.payload == null || action.payload == undefined || action.payload == '')?false:true,
                token : action.payload.token,
                user : action.payload.decode,
                error : {}
            }
        case GET_ERROR:
            return  {...state,
                isAuthorized:false,
                token : '',
                user : {},
                error : action.payload
            }  
        default:
            return state
    }
}