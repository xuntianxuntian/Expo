import { GET_BID_FROM_LIST} from '../actions/types'

const initialState = ''

export const bidFromList = (state = initialState, action) => {
    switch (action.type) {
        case GET_BID_FROM_LIST:
            return action.payload
        default:
            return state
    }
}