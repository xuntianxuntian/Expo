import { START_LOADING,STOP_LOADING } from '../actions/types'


const initialState = {
    isloading:false
}
export const isLoading = (state = initialState,action) => {

    switch(action.type){
        case START_LOADING:
            return {...state,
                isloading:true
            }
        case STOP_LOADING:
            return {...state,
                isloading:false
            }
        default:
            return state
    }
}