import { START_LOADING , STOP_LOADING } from './types'

export const isloading = (boolean) => (dispatch) => {
    if(boolean){
        dispatch({
            type:START_LOADING,
        })
    }else{
        dispatch({
            type:STOP_LOADING,
        })
    }
    
}
