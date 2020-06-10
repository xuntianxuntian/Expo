import { ADD_TO_INFOTEMPLIST ,DELETE_TO_INFOTEMPLIST,GET_INFOTEMPLIST,CHANGE_DEFAULT_TO_INFOTEMPLIST } from '../actions/types'

const initialState = []

export const infoTempList = (state=initialState,action) => {
    switch(action.type){
        case GET_INFOTEMPLIST:
            return action.payload
        case ADD_TO_INFOTEMPLIST:
            return [
                ...state,
                action.payload
            ]
        case DELETE_TO_INFOTEMPLIST:
            return action.payload
        
        case CHANGE_DEFAULT_TO_INFOTEMPLIST:
            return action.payload

        default:
            return state
    }
}