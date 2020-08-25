import { combineReducers } from 'redux'

import { loginReducer } from './auth/login.reducer'
import { registerReducer } from './auth/register.reducer'
import { registerToLogin } from '../reducers/auth/registerToLogin.reducer'
import { toogleSiderBar } from './toogleSiderBar.reducer'
import { isLoading } from './loading.reducer'
import { switchOperateExpo } from './switchOperateExpo.reducer'
import { companyToUpload } from './companyToUpload.reducer'
import { boothList } from './boothList.reducer'
import { bidFromList } from './bidFromList.reducer'
import { boothUploadInfo } from './DesignUploads/boothUploadInfo.reducer'
import { selectedTab } from './DesignUploads/switchTab.reducer'

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    toLogin: registerToLogin,
    toogleSiderBar,
    loading: isLoading,
    switchOperateExpo,
    companyToUpload,
    boothList,
    boothUploadInfo,
    selectedTab,
    bidFromList
})