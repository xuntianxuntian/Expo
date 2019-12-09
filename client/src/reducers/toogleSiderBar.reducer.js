import { TOOGLE_SIDERBAR } from '../actions/types'

const historylocation = localStorage.sideLocation
const initialState = historylocation ? ( {
                                            location: historylocation
                                        }) :
                                        ({
                                            location: 'myExpo'
                                        })
export const toogleSiderBar = (state = initialState, action) => {

    switch (action.type) {
        case TOOGLE_SIDERBAR:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state
    }
}