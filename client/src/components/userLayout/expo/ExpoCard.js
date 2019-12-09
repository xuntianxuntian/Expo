import React, { Component } from 'react'
import { Card, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import store from '../../../store'
import {TOOGLE_SIDERBAR} from '../../../actions/types'


import isEmpty from '../../../utils/isEmpty'
import '../../../css/expo/expoCard.css'



class ExpoCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imgSrc: '',//图片源
            imgAlt: '', //图片的alt属性
            operator: false,//下方action操作按钮的切换控制
            metaTitle: '添加展会',
            metaDescription: ''
        }
    }

    onAddExpo = (e) =>{
        localStorage.setItem('sideLocation','getExpo')
        store.dispatch({
            type:TOOGLE_SIDERBAR,
            payload:'getExpo'
        })
    }


    render() {
        const { Meta } = Card

        return (
            <div>{
                isEmpty(this.props.expoInfo) ?
                    <Card
                        className = "add-container"
                        style={{ width: 300 }}
                        cover={
                            <Icon type="plus-circle" />
                        }
                        actions={
                            [<Button type="primary">查询展会</Button>]
                        }
                    >

                        <Meta
                            // avatar={<Icon type="" />}
                            title={<Link to = "/getExpo" onClick={this.onAddExpo}><Button type="primary">添加展会</Button></Link>}
                            description=' '

                        />
                    </Card>
                    :
                    <Card
                        className = "normal-container"
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={
                            [
                                <Icon type="setting" key="setting" />,
                                <Icon type="edit" key="edit" />,
                            ]}
                    >
                        <Meta
                            // avatar={<Icon type="" />}
                            title={this.props.expoInfo.expoTitle}
                            description={this.props.expoInfo.expoDescription}
                        />
                </Card>
            }
            </div>
        )
    }
}




export default ExpoCard