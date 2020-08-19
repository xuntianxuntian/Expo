import React, { Component } from 'react'
import { Table, Upload, Button, Typography, Tag, Tooltip, } from 'antd';
import axios from 'axios';
import moment from 'moment'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { switchToUpload } from '../../../../../actions/changeBoothDesignTab.action'


class DesignCheckingList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableList: [],
            expandedList: [],
            uploadDisabled: false
        }
    }

    componentDidMount() {
        let eid = localStorage.getItem('current_eid')
        axios.get(`/api/user/booth/list/${eid}`)
            .then(res => {
                console.log(res.status)
                if (res.status == 200 && res.data.booth) {
                    let tableList = []
                    console.log(res)
                    res.data.booth.forEach((b, i) => {
                        const { bName, bOwner, auth } = b
                        const status = auth.booth.status || 'uncommited'
                        const reCheckButton = auth.booth.status || 'uncommited'
                        const authTime = auth.booth.authTime || '-'
                        const authBoothErr = auth.booth.err || ''
                        tableList.push({ bName: bName.fullName, bOwner, authTime, reCheckButton, status, authBoothErr, key: i })
                    })
                    this.setState({
                        ...this.state,
                        tableList
                    })
                }
            }).catch(err => {
                console.log(err.response)
            })
    }

    handleReWriteInfo(e, index) {
        e.preventDefault()
        console.log(index)
    }


    render() {

        const { Text } = Typography
        const { tableList } = this.state

        const onTableButtonClick = (e, value) => {
            e.preventDefault()
            switch (value) {
                case 'uncommited':
                    return onChangeToUploadTab()
                case 'failed':
                    return onReCheckButton(value)
                default:
                    return null
            }
        }
        //列表单项状态为  审核失败‘failed’时  点击按钮的回调 重新提交
        const onReCheckButton = (value) => {
            console.log(value)
        }
        //列表单项装备为   未提交‘uncommitted’  点击  切换标签到Upload项
        const onChangeToUploadTab = () => {
            this.props.switchToUpload()
        }

        //控制每行下拉表单的 展开图标 只在有错误的时候才渲染图标
        // const showExpandIcon = (props) => {
        //     if (!props.record.auth.err.length) {
        //         return ''
        //     } else if (props.expanded == true) {
        //         return <Icon type="down" />
        //     } else {
        //         return <Icon type="right" />
        //     }
        // }

        // const expandedRowRender = (record, index, indent, expanded) => {
        //     let that = this
        //     let errName = []
        //     if (record.auth.err.length) {
        //         record.auth.err.forEach(errContent => {
        //             errName.push(Object.keys(errContent)[0])
        //         })
        //     } else if (record.status == 'uncommited') {
        //         return <Tag color="volcano">您的展位号:{record.boothId}还未添加审核申请，请先提交审核资料!</Tag>
        //     } else if (record.status == 'commited') {
        //         return <Tag color="geekblue">{record.boothId}正在审核中，请耐心等待....</Tag>
        //     } else if (record.status == 'success') {
        //         return <Tag color="#87d068">{record.boothId}的资料审核已通过!</Tag>
        //     }

        //     const columns = [
        //         { title: '未通过项目', dataIndex: 'failedItem', key: '1' },

        //         { title: '审核说明', dataIndex: 'err', key: '2', width: '300px' },
        //         {
        //             title: '重新上传',
        //             dataIndex: 'action',
        //             key: '3',
        //             render: (text, record, index) => {
        //                 if (text == 'file') {
        //                     const props2 = {
        //                         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //                         name: 'yyzz',
        //                         listType: 'text',
        //                         defaultFileList: [],
        //                         className: 'upload-list-inline-reUpload',
        //                         headers: {
        //                             authorization: localStorage.token,
        //                         },
        //                         multiple: true
        //                     }
        //                     return (
        //                         < Upload {...props2} style={{ width: '100%' }} >
        //                             <Button disabled={this.state.uploadDisabled}>
        //                                 <Icon type="upload" /> 上传文件
        //                             </Button>
        //                         </Upload >)
        //                 } else if (text == 'info') {
        //                     return (
        //                         <Input
        //                             prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
        //                             placeholder="请重新填写信息"
        //                         />
        //                     )
        //                 }
        //             },
        //         },

        //     ]

        //     const data = []
        //     for (let i = 0; i < record.auth.err.length; ++i) {
        //         let infoError = ['maxHt', 'maxSp', 'minTh', 'totalEp', 'cableTp']
        //         let CNinfoError = ['展位最高点高度(单位:m)', '展位结构最大跨度(单位:m)', '展位承重墙最小厚度(单位:cm)',
        //             '展位用电总功率(单位:kw)', '展位电缆规格(单位:mm²)']
        //         let fileError = ['wtPic', 'xgPic', 'ccPic', 'czPic', 'dlPic', 'aqPic', 'qtPic']
        //         let CNfileError = ['委托证明', '效果图', '尺寸图', '材质图', '电路图', '安全责任书', '其他资质']
        //         infoError.forEach((errName, nameIndex) => {
        //             if (errName == Object.keys(record.auth.err[i])[0]) {
        //                 data.push({
        //                     key: i,
        //                     err: Object.values(record.auth.err[i])[0],
        //                     failedItem: CNinfoError[nameIndex],
        //                     action: 'info'
        //                 })
        //             }
        //         })
        //         fileError.forEach((errName, nameIndex) => {
        //             if (errName == Object.keys(record.auth.err[i])[0]) {
        //                 data.push({
        //                     key: i,
        //                     err: Object.values(record.auth.err[i])[0],
        //                     failedItem: CNfileError[nameIndex],
        //                     action: 'file'
        //                 })
        //             }
        //         })

        //     }
        //     return <Table columns={columns} dataSource={data} pagination={false} />
        // }

        const columns = [
            { title: '展位号', dataIndex: 'bName', key: 'bName', align: 'center' },
            { title: '展位名称', dataIndex: 'bOwner', key: 'bOwner', align: 'center' },
            {
                title: '提交时间', dataIndex: 'authTime', key: 'authTime', align: 'center',
                render:(value)=>{
                    let authTime = moment(value).format('YYYY-MM-DD HH:MM')
                    return <Text> {authTime}</Text>
                }
            },
            {
                title: '审核结果', dataIndex: 'status', key: 'status', align: 'center',
                render: (value, record) => {
                    switch (value) {
                        case 'uncommited':
                            return <Tag color='red'>未认证</Tag>
                        case 'commited':
                            return <Tag color='blue'>认证中</Tag>
                        case 'failed':
                            return <span>
                                <Tag color='grey'>
                                    认证失败
                                    </Tag>
                                <Tooltip title={record.authBoothErr ? record.authBoothErr : ''}>
                                    <span>查看详情</span>
                                </Tooltip></span>
                        case 'success':
                            return <Tag color='green'>认证成功</Tag>
                        default:
                            return ''
                    }
                }
            },
            {
                title: '提交',
                dataIndex: 'reCheckButton',
                key: 'reCheckButton',
                render: (value) => (
                    <Button
                        disabled={value == 'success' || value == 'commited' ? true : false}
                        onClick={e => { onTableButtonClick(e, value) }}
                    >{value == 'uncommited' ? '上传资料' : value == 'failed' ?
                        '提交修改' : value == 'success' ? '审核成功' : '审核中'}</Button>
                ),
                align: 'center'
            },
        ]


        return (<Table
            className="components-table-demo-nested"
            columns={columns}
            // expandedRowRender={(record, index, indent, expanded) => expandedRowRender(record, index, indent, expanded)}
            dataSource={tableList}
        // expandIcon={(props) => showExpandIcon(props)}
        // expandRowByClick={true}
        // expandedRowKeys={['0']}
        />
        )
    }
}

const mapStateToProps = state => ({
})

DesignCheckingList.propTypes = {
    switchToUpload: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { switchToUpload })(DesignCheckingList)

