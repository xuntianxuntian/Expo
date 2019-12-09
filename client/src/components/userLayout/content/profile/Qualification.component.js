import React, { Component } from 'react'
import {List , Avatar} from 'antd'
import store from '../../../../store'

class Qualification extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }


    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "qualification"
        })
    }


    render() {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    // dataSource={}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Qualification