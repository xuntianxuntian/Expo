import React, { Component } from 'react'
import store from '../../../../store'

class Booth extends Component {


    componentDidMount(){
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type:"TOOGLE_SIDERBAR",
            payload:"booth"
        })
    }


    render() {
        return (
            <div>
                我的展位
            </div>
        )
    }
}

export default Booth