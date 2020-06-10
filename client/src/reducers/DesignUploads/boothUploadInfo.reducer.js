import { COMMIT_INFO, COMMIT_ERROR } from '../../actions/types'


const initialState = {
    error:{},
    uploadInfo:{}
}
export const boothUploadInfo = (state=initialState,action) => {
    switch(action.type) {
        case COMMIT_INFO:
            return {
                ...state,
                uploadInfo:action.payload
            }
        case COMMIT_ERROR:
            return {
                ...state,
                error:action.payload
            }
        default :
             return state
    }
        
        

}