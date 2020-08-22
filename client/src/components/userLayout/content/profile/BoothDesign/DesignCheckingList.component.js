import React, { Component } from 'react'
import { Table, Upload, Button, Typography, Tag, Icon, } from 'antd';
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
                if (res.status == 200 && res.data.boothList) {
                    let tableList = []
                    console.log(res)
                    res.data.boothList.forEach((b, i) => {
                        const { bName, bOwner, auth,bid } = b
                        tableList.push({ bName: bName.fullName, bOwner, auth, key: i,bid })
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

        const onTableButtonClick = (e, bName) => {
            e.preventDefault()
            this.props.onRef(bName)
            return onChangeToUploadTab()

        }
        //列表单项状态为  审核失败‘failed’时  点击按钮的回调 重新提交

        //列表单项装备为   未提交‘uncommitted’  点击  切换标签到Upload项
        const onChangeToUploadTab = () => {
            this.props.switchToUpload()
        }

        //控制每行下拉表单的 展开图标 只在有错误的时候才渲染图标
        const showExpandIcon = (props) => {
            if (props.expanded == true) {
                return <Icon type="down" />
            } else {
                return <Icon type="right" />
            }
        }

        const expandedRowRender = (record, index, indent, expanded) => {
            if (record.auth.booth.status == 'uncommited') {
                return <span>请先提交审核资料。</span>
            } else if (record.auth.booth.status == 'commited') {
                return <span>正在审核中，请耐心等待....</span>
            } else if (record.auth.booth.status == 'success') {
                return <span>本展位施工搭建审核已通过!</span>
            }

            const columns = [
                { title: '未通过项目', dataIndex: 'name', key: '1', width: '300px', },

                { title: '未通过原因', dataIndex: 'message', key: '2', },
            ]
            const errorNameMap = {
                xgPic: '施工效果图', ccPic: '施工尺寸图', czPic: '施工材质图', dlPic: '施工电路图', aqPic: '安全责任书', qtPic: '其他证件',
                maxHt: '展位最大高度', maxSp: '单体结构最大宽度', minTh: '支撑结构最小厚度', totalEp: '用电总功率', cableTp: '电料电缆规格', email: '邮箱',
            }
            const data = []
            if (record.auth && record.auth.booth && record.auth.booth.err && record.auth.booth.err.length) {
                record.auth.booth.err.forEach((error, i) => {
                    const name = errorNameMap[error.name]
                    data.push({ name, message: error.message, key: i })
                })
            }

            return <Table columns={columns} dataSource={data} pagination={false} />
        }


        const columns = [
            { title: '展位号', dataIndex: 'bName', key: 'bName', },
            { title: '展位名称', dataIndex: 'bOwner', key: 'bOwner', },
            {
                title: '提交时间', dataIndex: 'auth', key: 'authTime',
                render: (value) => {
                    const time = value.booth.authTime || 0
                    if (time == 0) return <Text> - </Text>
                    let timeStr = moment(time).format('YYYY-MM-DD HH:MM')
                    return <Text> {timeStr}</Text>
                }
            },
            {
                title: '审核结果', dataIndex: 'auth', key: 'status',
                render: (value, record) => {
                    const status = value.booth.status || 'uncommited'
                    switch (status) {
                        case 'uncommited':
                            return <Tag color='red'>未上传资料</Tag>
                        case 'commited':
                            return <Tag color='blue'>审核中</Tag>
                        case 'failed':
                            return <span>
                                <Tag color='grey'>
                                    审核未通过
                                    </Tag>
                            </span>
                        case 'success':
                            return <Tag color='green'>审核通过</Tag>
                        default:
                            return ''
                    }
                }
            },
            {
                title: '提交',
                dataIndex: 'auth',
                key: 'action',
                render: (value, record) => {
                    const status = value.booth.status || 'uncommited'
                    switch (status) {
                        case 'uncommited':
                            return <Button onClick={e => { onTableButtonClick(e, record.bName) }}>上传</Button>
                        case 'commited':
                            return ''
                        case 'failed':
                            return <Button onClick={e => { onTableButtonClick(e,  record.bName) }}>修改</Button>
                        case 'success':
                            return <Icon type="check" />
                        default:
                            return ''
                    }
                }

                ,

            },
        ]
        return (<Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={(record, index, indent, expanded) => expandedRowRender(record, index, indent, expanded)}
            dataSource={tableList}
            // expandIcon={(props) => showExpandIcon(props)}
            expandRowByClick={true}
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

