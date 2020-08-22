import React, { Component } from 'react'
import { Table, Tooltip, Tag, Upload, message, Button, Icon, Typography, Spin, Empty } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import store from '../../../../store'
import moment from 'moment'
import SearchBooth from './SearchBooth.component'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToBoothList, changeToBoothList } from '../../../../actions/changeBoothList.action'


class Booth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            boothList: []
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
                            this.props.changeToBoothList(boothList)
                            this.setState({
                                ...this.state,
                                boothList,
                                isLoading: false,
                            })
                        } else {
                            this.props.changeToBoothList([])
                            this.setState({
                                ...this.state,
                                boothList: [],
                                isLoading: false,
                            })
                        }
                    })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        ...this.state,
                        boothList: [],
                        isLoading: false,
                    })
                })
        }
    }




    render() {

        let dataSource = []
        if (this.state.boothList && this.state.boothList.length) {
            dataSource = this.state.boothList.map((b, i) => {
                let { bName, bSize, bOwner, auth } = b
                let wtPic = b.file ? b.file.wtPic : ''
                let { company } = auth
                return {
                    bSize, bOwner, bName,
                    authCompanyTime: company.authTime ? moment(company.authTime).format('YYYY-MM-DD HH:MM') : '-',
                    authCompanyStatus: company.status,
                    authCompanyErr: company.err ? company.err : ' ',
                    wtPic, key: i
                }
            })
        }
        console.log(dataSource)

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
                title: '认证状态',
                key: 'authCompanyStatus',
                dataIndex: 'authCompanyStatus',
                align: 'center',
                render: (authCompanyStatus, record) => {
                    switch (authCompanyStatus) {
                        case 'uncommited':
                            return <Tag color='red'>未认证</Tag>
                        case 'commited':
                            return <Tag color='blue'>认证中</Tag>
                        case 'failed':
                            return <span>
                                <Tag color='grey'>
                                    认证失败
                                </Tag>
                                <Tooltip title={record.authCompanyErr ? record.authCompanyErr : ''}>
                                    <span>查看详情</span>
                                </Tooltip>
                            </span>
                        case 'success':
                            return <Tag color='green'>认证成功</Tag>
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
            {
                title: '上传委托书',
                key: 'wtPic',
                dataIndex: 'wtPic',
                align: 'center',
                render: (wtPic, record) => {
                    if (wtPic) {
                        return <Text>已上传</Text>
                    } else {
                        return <Upload {...props}>
                            <Button>
                                <Icon type="upload" />
                            </Button>
                        </Upload>
                    }

                },
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
                    dataSource={dataSource}
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
    // boothList: state.boothList
})

Booth.propTypes = {
    // boothList: PropTypes.array.isRequired,
    addToBoothList: PropTypes.func.isRequired,
    changeToBoothList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addToBoothList, changeToBoothList })(Booth)
