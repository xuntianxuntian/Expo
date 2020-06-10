import { COMMIT_INFO, COMMIT_ERROR } from '../types'

export const commitInfo = (value) => (dispatch) => {
    dispatch({
        type: COMMIT_INFO,
        payload: value
    })
}

export const commitError = (err) => (dispatch) => {
    dispatch({
        type:COMMIT_ERROR,
        payload:err
    })
}
