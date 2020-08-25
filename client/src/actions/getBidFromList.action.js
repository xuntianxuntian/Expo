import {GET_BID_FROM_LIST} from './types'

export const getBidFromList = (bid) => (dispatch) => {
    dispatch({
        type:GET_BID_FROM_LIST,
        payload:bid
    })
}