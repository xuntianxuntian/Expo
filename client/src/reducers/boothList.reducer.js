import { ADD_TO_BOOTHLIST ,CHANGE_TO_BOOTHLIST} from '../actions/types'

const initialState = []

export const boothList = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BOOTHLIST:
            return [...state,action.payload]
        case CHANGE_TO_BOOTHLIST:
            return action.payload
        default:
            return state
    }
}