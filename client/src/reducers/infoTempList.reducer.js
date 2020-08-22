import { GET_DEFTEMP, ADD_TO_TEMPLIST, DELETE_FROM_TEMPLIST, GET_TEMPLIST, CHANGE_DEFTEMPLATE } from '../actions/types'

const initialState = { tempList: [], defTemp: {} }

export const infoTempList = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEMPLIST:
            return {
                ...state,
                tempList: [...action.payload],
            }
        case ADD_TO_TEMPLIST:
            return {
                ...state,
                tempList: [...state.tempList, action.payload],
            }
        case DELETE_FROM_TEMPLIST:
            return {
                ...state,
                tempList:[...action.payload]
            }

        case CHANGE_DEFTEMPLATE:
            return {
                ...state,
                defTemp: action.payload
            }
        case GET_DEFTEMP:
            return action.payload

        default:
            return state
    }
}