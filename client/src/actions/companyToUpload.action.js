import { COMPANY_TO_UPLOAD } from './types'

const companyToUpload = (actionType,company) => (dispatch) => {
    dispatch(
        {
            type:actionType,
            payload:company
        }
    )
    
}

export default companyToUpload