import React, { Component, Fragment } from 'react'
import ExpoCard from './ExpoCard';
import axios from 'axios'
import store from '../../../store'



class MyExpo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expos: [{}]
        }

    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "myExpo"
        })

        axios.get('/api/myExpo.json')
            .then(res => {
                if (res.data.length) {
                    this.setState({
                        ...this.state,
                        expos: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Fragment>
                {this.state.expos.map((expo, index) => <ExpoCard status="EXPO" expoInfo={expo} key={index} />
                )}
                <ExpoCard status="DEFAULT" />
            </Fragment>
        )
    }
}




export default MyExpo