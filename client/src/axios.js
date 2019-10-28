import axios from 'axios'
import store from './store'
import { START_LOADING } from './actions/types'

class $axios {

    // get
    //@isloading  (Boolean)  dispatch 加载状态Action
    //@url 地址
    static async get(url, isloading, params) {  //loading为你要按需使用的loading的值如果为true就开启如果为false就不开启
        //因为await使异步等待执行所以他会先执行loading函数
        if (isloading) {
            store.dispatch({
                type: START_LOADING
            })
        }

        return await axios.get(url, { params })
    }
    //post
    //@isloading  (Boolean)  dispatch 加载状态Action
    //@url 地址
    static async post(url, isloading, params) {
        if (isloading) {
            store.dispatch({
                type: START_LOADING
            })
        }
        return await axios.post(url, { params })
    }

}

export default $axios