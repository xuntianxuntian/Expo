import { SWITCH_TABS_TO_CHECKLIST,SWITCH_TABS_TO_UPLOAD,SWITCH_TABS_TO_INFOTEMP } from '../../actions/types'

const initialState = 1

export const selectedTab = (state=initialState,action) => {
    switch(action.type){
        case SWITCH_TABS_TO_CHECKLIST:
            return 1
        case SWITCH_TABS_TO_UPLOAD:
            return 0
        case SWITCH_TABS_TO_INFOTEMP:
            return 2
        default:
            return state
    }
}