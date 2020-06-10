import { ADD_TO_BOOTHLIST ,CHANGE_TO_BOOTHLIST} from './types'

//在查询到展位后修改boothList  添加新一个booth  用于控制当页状态的变化
export const addToBoothList = (booth) => (dispatch) => {
    dispatch({
        type: ADD_TO_BOOTHLIST,
        payload: booth
    })
}

//重置boothList  从服务器获取展位列表时  覆盖原先state  
//保持与服务器的一致性 用于组件重载切换的状态变化

export const changeToBoothList = (boothList) => (dispatch) => {
    dispatch({
        type: CHANGE_TO_BOOTHLIST,
        payload: boothList
    })
}
