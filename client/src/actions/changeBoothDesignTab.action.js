import {SWITCH_TABS_TO_CHECKLIST,SWITCH_TABS_TO_INFOTEMP,SWITCH_TABS_TO_UPLOAD} from './types'

export const switchToUpload = () => (dispatch) => {
    dispatch({
        type:SWITCH_TABS_TO_UPLOAD,
    })
}
export const switchToCheckList = () => (dispatch) => {
    dispatch({
        type:SWITCH_TABS_TO_CHECKLIST,
    })
}
export const switchToInfoTemp = () => (dispatch) => {
    dispatch({
        type:SWITCH_TABS_TO_INFOTEMP,
    })
}