import { TOOGLE_SIDERBAR } from './types'

const toogleHandler = (location) => (dispatch) => {
    localStorage.setItem('sideLocation', location)
    dispatch({
        type: TOOGLE_SIDERBAR,
        payload: location
    })
}

export default toogleHandler