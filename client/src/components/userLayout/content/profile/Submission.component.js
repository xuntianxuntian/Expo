import React, { Component } from 'react'
import store from '../../../../store'
import bg from '../../../../bg_02.jpg'

class Submission extends Component {


    componentDidMount(){
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type:"TOOGLE_SIDERBAR",
            payload:"submission"
        })
    }


    render() {
        return (
            <div>
                手续申报
                <img src = {"../../../../bg_02.jpg"} />
            </div>
        )
    }
}

export default Submission