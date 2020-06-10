import React, { Component } from 'react'
import { List, Card, Typography, Dropdown, Col, Row, Menu, Upload, Icon, Button, Cascader, } from 'antd'
import store from '../../../../store'
import axios from 'axios'
import isEmpty from '../../../../utils/isEmpty';
import '../../../../css/content/uploads.inlinestyle.css'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class DesignUploads extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uploadDisabled: true
        }
    }

    componentDidMount() {
        // axios.get('/api/')
    }

    // booth selector onchange
    onBoothChange = value => {
        console.log(value)
        if (!isEmpty(value)) {
            return this.setState({
                ...this.state,
                uploadDisabled: false
            })
        }
        return this.setState({
            ...this.state,
            uploadDisabled: true
        })
    }



    render() {

        const { Text } = Typography
        const currentExpo = localStorage.currentExpo || '测试展会'

        //booth uploads item Title datasource
        const data = [
            {
                title: '效果图',
            },
            {
                title: '尺寸图',
            },
            {
                title: '材质图',
            },
            {
                title: '电器分布及用电规格',
            },
            {
                title: '责任安全书',
            },
            {
                title: '其他证件',
            },
        ]

        //booth selector data source
        const options = this.props.boothList.length > 0?this.props.boothList.map(booth => {
            return {
                value: booth.boothId,
                label: booth.boothId
            }
        }):[{
            value:'',
            label:'未检测到展位信息'
        }]


        // List Items uploads props
        const props2 = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            name: 'yyzz',
            listType: 'picture',
            defaultFileList: [],
            className: 'upload-list-inline-boothDesign',
            headers: {
                authorization: localStorage.token,
            },
            multiple:true
        }

        //pop content datasource
        const popContent = (
            this.state.uploadDisabled ?
                (<div>
                    <p>请选择相应展位！</p>
                </div>) : ''
        )



        return (
            <div>
                <div>
                    <Row>
                        {/* <Col span={8}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', lineHeight: '32px' }}>当前展会：</span>
                            <Text strong>{currentExpo}</Text>
                        </Col> */}
                        <Col span={8}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>请选择展位：</span>
                            <Cascader options={options} onChange={value => this.onBoothChange(value)} placeholder='请选择展位' />
                        </Col>
                    </Row>
                    <List
                        size='small'
                        style={{ backgroundColor: 'white', paddingBottom: '50px' }}
                        itemLayout="horizontal"
                        dataSource={data}

                        renderItem={item => (
                            <List.Item
                                extra={
                                    <img
                                        width={120}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={<Text >{item.title}</Text>}
                                    description={
                                        <Upload {...props2} style={{ width: '100%' }}>
                                            <Button disabled={this.state.uploadDisabled}>
                                                <Icon type="upload" /> 上传文件
                                                </Button>
                                        </Upload>
                                    }
                                />
                                
                            </List.Item>
                        )} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    boothList: state.boothList
})

DesignUploads.propTypes = {
    boothList: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, {})(DesignUploads)


