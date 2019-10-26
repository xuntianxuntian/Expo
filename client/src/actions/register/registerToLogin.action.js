import { REGISTER_TO_LOGIN } from '../types'

const registerToLogin = (tabKey) => (dispatch) => {
    dispatch({
        type:REGISTER_TO_LOGIN,
        payload:tabKey
    })
}

export default registerToLogin