import React, { Component } from 'react'
import { Table, Divider, Tag, Upload, message, Button, Icon, Typography, Spin, Empty } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import isEmpty from '../../../../utils/isEmpty'
import SearchBooth from './SearchBooth.component'
import CustomUploads from '../../../customUploads.component'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToBoothList, changeToBoothList } from '../../../../actions/changeBoothList.action'


class Booth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }


    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "booth"
        })
        //查询对应用户  当前展会的展位列表  
        axios.get('/api/booth/listAll', { params: { cid: localStorage.currentExpoCID } })
            .then(
                res => {
                    console.log(res.data)
                    if (res.data.length) {
                        res.data.forEach((booth, index) => {
                            booth['key'] = index
                        })
                        this.props.changeToBoothList(res.data)
                        this.setState({
                            ...this.state,
                            isLoading: false,
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            isLoading: false,
                        })
                    }
                })
            .catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
            })
    }




    render() {

        const { Title, Paragraph, Text } = Typography
        const props = {
            listType: 'text',
            name: 'yyzz',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: localStorage.token,
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        }

        const columns = [
            {
                title: '展位号',
                dataIndex: 'boothId',
                key: 'boothId',
                align: 'center',
                render: text => <Text>{text}</Text>,
            },
            {
                title: '展位名称',
                key: 'boothName',
                dataIndex: 'boothName',
                align: 'center',
            },
            {
                title: '展位面积',
                dataIndex: 'boothSize',
                key: 'boothSize',
                align: 'center',
            }, {
                title: '委托证明',
                dataIndex: 'wtPic',
                key: 'wtPic',
                align: 'center',
                render: text => {
                    if (isEmpty(text)) {
                        return <CustomUploads
                            // style={{ display: 'inline-block' }}
                            // startUploading={this.state.startUploading}
                            uploadUrl='/api/uploads/booth'
                            fileName='wtPic'
                            previewStyle='text'
                            previewClassName='upload-list-inline-boothList'
                            isMultiple={true}
                        />
                        // return (<Upload {...props}>
                        //     <Button>
                        //         <Icon type="upload" /> 上传文件
                        //             </Button>
                        // </Upload>
                        // )
                    }

                    return <span>资料已提交</span>
                }
            },
            {
                title: '认证状态',
                key: 'isEnTrust',
                dataIndex: 'isEnTrust',
                align: 'center',
                render: isEntrusted => {
                    if (isEntrusted) {
                        return <Tag color='green'>已认证</Tag>

                    } else {
                        return <Tag color='blue'>未认证</Tag>
                    }

                },
            },
            {
                title: '操作',
                key: 'booth_operation',
                dataIndex: 'booth_operation',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Button type='primary'>提交</Button>
                        <Divider type="vertical" />
                        <Button type='danger' >删除</Button>
                    </span>
                ),
            },
        ]


        return (
            <div>
                <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                    <Title level={4} >| 展位认证</Title>
                    <Paragraph style={{ textIndent: '8px' }}>
                        添加展位时请提供盖有完整公章的<Text mark > 授权委托函！ </Text>
                    </Paragraph>
                </Typography>
                <div style={{ margin: '10px 30px' }}>
                    <SearchBooth />
                </div>
                <Table
                    columns={columns}
                    dataSource={this.props.boothList}
                    loading={this.state.isLoading}
                    locale={{ emptyText: '还未添加展会!' }}
                    style={{
                        margin: '0 20px',
                        height: '300px'
                    }}
                    pagination={{ position: 'bottom', pageSize: 5 }}
                // bordered
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    boothList: state.boothList
})

Booth.propTypes = {
    boothList: PropTypes.array.isRequired,
    addToBoothList: PropTypes.func.isRequired,
    changeToBoothList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addToBoothList, changeToBoothList })(Booth)
