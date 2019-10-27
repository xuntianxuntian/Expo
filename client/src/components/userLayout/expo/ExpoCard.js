import React, { Component } from 'react'
import { Card, Icon, Button } from 'antd'
import isEmpty from '../../../utils/isEmpty'



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
        console.log(this.props)
        if (this.props.status === 'DEFAULT') {
            // const initialState = {
            //     imgSrc: '',//图片源
            //     imgAlt: '', //图片的alt属性
            //     operator: false,//下方action操作按钮的切换控制
            //     metaTitle: '添加展会',
            //     metaDescription: ''
            // }
            // this.setState({
            //     ...this.state,
            //     initialState
            // })
            return
        } else {
            this.setState({
                imgSrc: this.props.expoInfo.expoImgSrc,
                imgAlt: this.props.expoInfo.expoTitle,
                operator: true,
                metaTitle: this.props.expoInfo.expoTitle,
                metaDescription: this.props.expoInfo.expoDescription,
            })
        }

    }



    render() {

        const { Meta } = Card

        return (
            <div>
                <Card
                    style={{ width: 300 }}
                    cover={
                        isEmpty(this.state.imgSrc)?<Icon type="plus-circle" />:
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={this.state.operator?[
                        <Icon type="setting" key="setting" />,
                        <Icon type="edit" key="edit" />,
                    ]:[<Button type="primary">查询展会</Button>]}
                >
                    <Meta
                        // avatar={<Icon type="" />}
                        title={this.state.metaTitle}
                        description={this.state.metaDescription}
                    />
                </Card>
            </div>
        )
    }
}




export default ExpoCard