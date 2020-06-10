import { UPLOAD_TO_VERIFY } from '../types'

const uploadToVerify = (info) => (dispatch) => {
    dispatch({
        type:UPLOAD_TO_VERIFY,
        payload:info
    })
}

export default uploadToVerify