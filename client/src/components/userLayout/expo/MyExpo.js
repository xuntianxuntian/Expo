import React, { Component, Fragment } from 'react'
import ExpoCard from './ExpoCard';
import axios from 'axios'



class MyExpo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expo: {}
        }
    }

    componentDidMount() {
        axios.get('/api/myExpo.json')
            .then(res => {
                console.log(res.data[0])
                if (res.data.length) {
                    this.setState({
                        ...this.state,
                        expo : res.data[0]
                    })
                }
            })
            .catch(err =>console.log(err))
    }
    render() {
        console.log(this.state.expo)
        return (
            <Fragment>
                <ExpoCard status="EXPO" expoInfo={this.state.expo} />
                <ExpoCard status="DEFAULT" />
            </Fragment>
        )
    }
}




export default MyExpo