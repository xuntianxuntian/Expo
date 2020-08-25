import React, { Component } from 'react'
import { Table, Tooltip, Tag, Upload, message, Button, Icon, Typography, Modal, Spin, List, Avatar, Divider } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import moment from 'moment'
import SearchBooth from './SearchBooth.component'
import pics from '../../../../bg_02.jpg'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToBoothList, changeToBoothList } from '../../../../actions/changeBoothList.action'


class Booth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            boothList: [],
            showPreviewModal: false,
            modalClass: '',
            isModalLoading: false,
            modalTitle: '',
            modalShowPic: false,
            previewImage: '',
            companyAuthError: [{}]
        }
    }


    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "booth"
        })
        let eid = localStorage.getItem('current_eid')
        if (eid) {
            //查询对应用户  当前展会的展位列表  
            axios.get(`/api/user/booth/list/${eid}`)
                .then(
                    res => {
                        if (res.data.boothList && res.data.boothList.length) {
                            let boothList = []
                            boothList = res.data.boothList.map((booth, index) => {
                                let b = { ...booth }
                                delete b.bName
                                b.bName = booth.bName.fullName
                                return { ...b, key: index }
                            })
                            localStorage.setItem('boothList', JSON.stringify(boothList))
                            this.setState({
                                ...this.state,
                                boothList,
                                isLoading: false,
                            })
                        } else {
                            this.setState({
                                ...this.state,
                                boothList: [],
                                isLoading: false,
                            })
                            localStorage.setItem('boothList', JSON.stringify([]))
                        }
                    })
                .catch(err => {
                    this.setState({
                        ...this.state,
                        boothList: [],
                        isLoading: false,
                    })
                })
        }
    }

    onPreviewWtPic = (e, record) => {
        e.preventDefault()
        console.log(record)
        this.onPreviewModal('pic', record)
    }

    onPreviewFailMessage = (e, record) => {
        e.preventDefault()
        console.log(record)
        this.onPreviewModal('message', record)
    }

    onPreviewModal = (type, record) => {
        let r = record
        if (type == 'pic') {
            this.setState(
                {
                    ...this.state,
                    showPreviewModal: true,
                    modalClass: 'picModel',//当加载玩图片后 将class切换到picModalLoading
                    isModalLoading: true,
                    modalTitle: '委托书预览',
                    modalShowPic: true
                }
            )
            console.log('render pic')

        } else {
            const companyAuthError = r.authCompanyErr.map((e, i) => { return { ...e, key: i + 1 } })
            this.setState(
                {
                    ...this.state,
                    showPreviewModal: true,
                    modalClass: '',
                    // isModalLoading: true,
                    modalTitle: '审核失败详情',
                    companyAuthError,
                }
            )
            console.log('render message')
        }


    }

    onPreviewCancel = () => {
        this.setState(
            {
                ...this.state,
                showPreviewModal: false,
                modalClass: '',
                isModalLoading: false,
                modalTitle: '',
                modalShowPic: false,
                previewImage: '',
                companyAuthError: [{}]
            }
        )
    }

    onReUploadWtPic = (e, record) => {
        e.preventDefault()
        console.log(record)
    }




    render() {
        // let that = this
        const { Title, Paragraph, Text } = Typography
        let dataSource = []
        if (this.state.boothList && this.state.boothList.length) {
            dataSource = this.state.boothList.map((b, i) => {
                let { bName, bSize, bOwner, auth, bid } = b
                return {
                    bSize, bOwner, bName, bid,
                    authCompanyTime: auth.authTime ? moment(auth.authTime).format('YYYY-MM-DD HH:MM') : '-',
                    authCompanyStatus: auth.status,
                    authCompanyErr: auth.err ? auth.err : [],
                    key: i,
                    wtPic: ['commited', 'failed', 'success'].includes(auth.status)
                }
            })
        }

        const props = {
            listType: 'text',
            name: 'yyzz',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: localStorage.token,
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info);
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
                dataIndex: 'bName',
                key: 'bName',
                align: 'center',
                render: text => <Text>{text}</Text>,
            },
            {
                title: '展位名称',
                key: 'bOwner',
                dataIndex: 'bOwner',
                align: 'center',
            },
            {
                title: '展位面积',
                dataIndex: 'bSize',
                key: 'bSize',
                align: 'center',
                render: text => <Text>{text} ㎡</Text>,
            },
            {
                title: () => (<Tooltip title="展商委托搭建的委托证明(盖双方公章)">委托证明<Icon type="question-circle" style={{ marginLeft: '2px', fontSize: '10px' }} /></Tooltip>),
                key: 'wtPic',
                dataIndex: 'wtPic',
                align: 'center',
                render: (wtPic, record) => {
                    const errFieldArr = record.authCompanyErr.map(err => err.field)
                    if (wtPic && errFieldArr.includes('wtPic')) {
                        return <Text>
                            <a onClick={(e) => this.onPreviewWtPic(e, record)}>查看</a>
                            <Divider type='vertical' />
                            <a onClick={(e) => this.onReUploadWtPic(e, record)}>重新上传</a>
                        </Text>
                    } else if (wtPic && (record.authCompanyStatus == "success" || record.authCompanyStatus == "commited" || record.authCompanyStatus == "failed")) {
                        return <Text><a onClick={(e) => this.onPreviewWtPic(e, record)}>查看</a></Text>
                    } else {
                        return <Upload {...props}>
                            <Button>
                                上传证明
                            </Button>
                        </Upload>
                    }

                },
            },
            {
                title: '委托审核',
                key: 'authCompanyStatus',
                dataIndex: 'authCompanyStatus',
                align: 'center',
                render: (authCompanyStatus, record) => {
                    const r = record
                    switch (authCompanyStatus) {
                        case 'uncommited':
                            return <Tag color='red'>未提交</Tag>
                        case 'commited':
                            return <Tag color='blue'>审核中</Tag>
                        case 'failed':
                            return <span>
                                <Tag color='grey'>
                                    失败
                                    <a><Icon type="question-circle" style={{ marginLeft: '2px', fontSize: '10px' }} onClick={(e, record) => this.onPreviewFailMessage(e, r)} /></a>
                                </Tag>
                            </span>
                        case 'success':
                            return <Tag color='green'>已通过</Tag>
                        default:
                            return ''
                    }

                },
            },
            {
                title: '认证时间',
                key: 'authCompanyTime',
                dataIndex: 'authCompanyTime',
                align: 'center',
                render: (text, record) => (
                    <Text>{text}</Text>
                ),
            },

        ]


        return (
            <div style={{ backgroundColor: 'white' }}>
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
                    dataSource={dataSource}
                    loading={this.state.isLoading}
                    locale={{ emptyText: '还未添加展会!' }}
                    style={{
                        margin: '0 20px',
                        backgroundColor: 'white',
                        // height: '300px',
                    }}
                    pagination={{ position: 'bottom', pageSize: 5 }}
                // bordered
                />
                <Modal
                    title={this.state.modalTitle}
                    visible={this.state.showPreviewModal}
                    footer={null}
                    onCancel={this.onPreviewCancel}
                // className={this.state.modalClass}
                >
                    <Spin tip="Loading..." spinning={this.state.isModalLoading}>
                        {this.state.modalShowPic ? (
                            <div className={this.state.modalClass}>
                                <img alt="example" style={{ width: '100%' }}
                                    src={pics}
                                />
                            </div>


                        ) : (
                                <div style={{ padding: '10px 20px' }}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={this.state.companyAuthError}
                                        renderItem={item => {
                                            let err = item
                                            return (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar style={{ backgroundColor: 'red', verticalAlign: 'middle' }} size="large">
                                                            {item.key}
                                                        </Avatar>}
                                                        title={<span>错误项项目:<span style={{ fontWeight: 'bold' }}>{item.field}</span></span>}
                                                        description={
                                                            <Paragraph
                                                            >
                                                                {item.message}
                                                            </Paragraph>
                                                        }
                                                    />
                                                </List.Item>
                                            )
                                        }
                                        }
                                    />
                                </div>
                            )}
                    </Spin>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // boothList: state.boothList
})

Booth.propTypes = {
    // boothList: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { addToBoothList, changeToBoothList })(Booth)
