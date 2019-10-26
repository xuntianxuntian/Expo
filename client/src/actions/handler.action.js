import { HANDLER_TOOGLE } from './types'

const toogleHandler = (handler) => (dispatch) => {
   dispatch({
       type:HANDLER_TOOGLE,
       payload:handler
   })
}

export default toogleHandler