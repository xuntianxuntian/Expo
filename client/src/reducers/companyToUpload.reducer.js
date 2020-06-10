import { COMPANY_TO_UPLOAD , UPLOAD_TO_COMPANY } from '../actions/types'


const initialState = {to:false}
export const companyToUpload = (state = initialState,action) => {

    switch(action.type){
        case COMPANY_TO_UPLOAD:
            return {...state,
                to:true,
                companyFromStore:action.payload
            }
        case UPLOAD_TO_COMPANY:
            return {...state,
                to:false,
                companyFromStore:action.payload
            }
        default:
            return state
    }
}