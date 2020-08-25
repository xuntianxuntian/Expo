import React, { Component } from "react";
import { Table, Divider, Typography, message, Tooltip, Popconfirm, Button } from 'antd';
import axios from 'axios'
import InfoTempForm from "./InfoTempForm.component";

class InfoTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            templateList: [],
            defTemp: {},
            reloadList: false,
            templateToBeUpdate: {},
            showDeleteConfirmModal: false
        }
    }

    componentDidMount() {
        axios.get('/api/user/template')
            .then(
                res => {
                    if (res.status === 200) {
                        const templateList = res.data.templateList.map(
                            (template, i) => {
                                return {
                                    ...template,
                                    key: i
                                }
                            }
                        )
                        this.setState(
                            {
                                ...this.state,
                                templateList,
                                isLoading: false
                            }
                        )
                    }
                }
            ).catch(err => {
                console.log(err)
                this.setState(
                    {
                        ...this.state,
                        isLoading: false
                    }
                )
                message.error({ content: err.response.data, key: 'getTemplistFailed' })
            })

    }

    onReloadTemp = (value) => {
        if (value) {
            axios.get('/api/user/template')
                .then(
                    async res => {
                        if (res.status === 200) {
                            const templateList = res.data.templateList.map(
                                (template, i) => {
                                    return {
                                        ...template,
                                        key: i
                                    }
                                }
                            )
                            this.setState(
                                {
                                    ...this.state,
                                    templateList
                                }
                            )
                            await axios.get('/api/user/defTemp')
                                .then(
                                    sres => {
                                        if (sres.status === 200) {

                                            this.setState(
                                                {
                                                    ...this.state,
                                                    defTemp: sres.data.template,
                                                    isLoading: false
                                                }
                                            )
                                        }
                                    }
                                )
                        }
                    }
                ).catch(err => {
                    console.log(err)
                    this.setState(
                        {
                            ...this.state,
                            isLoading: false
                        }
                    )
                    message.error({ content: err.response.data, key: 'getTemplistFailed' })
                })
        }
    }

    onDeleteTemp = (e, tid) => {
        e.preventDefault()
        this.setState(
            {
                ...this.state,
                isLoading: true,
                showDeleteConfirmModal: true
            }
        )
        axios.delete(`/api/user/template?tid=${tid}`)
            .then(
                async res => {
                    if (res.status === 200) {
                        axios.get('/api/user/template').then(
                            sres => {
                                if (sres.status == 200) {
                                    const templateList = sres.data.templateList.map(
                                        (template, i) => {
                                            return {
                                                ...template,
                                                key: i
                                            }
                                        }
                                    )
                                    this.setState({
                                        ...this.state,
                                        templateList,
                                        isLoading: false
                                    })
                                    message.success({ content: res.data, key: 'deleteTempSuccess' })
                                }
                            }
                        )
                    }
                }
            ).catch(err => {
                this.setState(
                    {
                        ...this.state,
                        isLoading: false
                    }
                )
                message.error({ content: err.response.data, key: 'deleteTempFailed' })
            })
    }

    onCancleDelete = (e) => {
        this.setState(
            {
                ...this.state,
                showDeleteConfirmModal: false
            }
        )
    }

    onUpdateTemp = (e, template) => {
        e.preventDefault()
        window.location.hash = ''
        window.location.hash = 'tempForm'
        this.setState({
            ...this.state,
            templateToBeUpdate: template
        })
    }

    onSetDefTemp = (e, info) => {
        e.preventDefault()
        this.setState(
            {
                ...this.state,
                isLoading: true
            }
        )
        axios.put('/api/user/defTemp', { tid: info.tid })
            .then(
                res => {
                    if (res.status === 200) {
                        this.setState(
                            {
                                ...this.state,
                                isLoading: false
                            }
                        )
                        localStorage.setItem('default_template', info.tid)
                        message.success({ content: res.data.message, key: 'updateDefTempSuccess' })
                        this.onReloadTemp(true)
                    }
                }
            ).catch(
                err => {
                    this.setState(
                        {
                            ...this.state,
                            isLoading: false
                        }
                    )
                    message.error({ content: err.response.data, key: 'updateDefTempFailed' })
                })

    }


    render() {
        const { defTemp, templateList, isLoading } = this.state
        const { Text, Title } = Typography
        const columns = [
            {
                title: '模板名称',
                dataIndex: 'tempName',
                key: 'tempName',
                render: text => <a>{text}</a>,
            },
            {
                title: '施工负责人',
                dataIndex: 'bmName',
                key: 'bmName',
                render: (value, record) => {
                    return (<Tooltip title={record.bmTel}>
                        <span>{value}</span>
                    </Tooltip>)
                }
            },
            {
                title: '电力负责人',
                dataIndex: 'emName',
                key: 'emName',
                render: (value, record) => {
                    return (<Tooltip title={record.emTel}>
                        <span>{value}</span>
                    </Tooltip>)
                }
            },
            {
                title: '预留邮箱',
                key: 'email',
                dataIndex: 'email',
            },
            {
                title: '',
                key: 'action',
                dataIndex: '',
                render: (text, record, index) => {
                    let info = record
                    return (
                        <span>
                            {localStorage.getItem('default_template') && record.tid == localStorage.getItem('default_template') ?
                                (
                                    <Button type="primary" size="small" disabled>
                                        默认模板
                                    </Button>
                                )
                                :
                                (
                                    <Button type="primary" size="small" loading={this.state.isLoading} onClick={e => this.onSetDefTemp(e, info)}>
                                        设为默认
                                    </Button>
                                )
                            }
                            <Divider type="vertical" />
                            <a onClick={e => this.onUpdateTemp(e, info)}>修改</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定要删除这个模板吗?"
                                onConfirm={(e) => this.onDeleteTemp(e, info.tid)}
                                onCancel={this.onCancleDelete}
                                okText="确定"
                                cancelText="取消"
                            >
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )

                },
            },
        ]


        return (
            <div style={{ margin: '0 20px' }}>
                <Title level={4} style={{ margin: '10px 0 5px 20px', fontSize: '16px' }}>我的信息模板:</Title>
                <Divider />
                <Table columns={columns} dataSource={templateList}
                    loading={isLoading}
                    pagination={false}
                    bordered={true}
                />
                <a name="tempForm" href="#tempForm">

                    <Title level={4} style={{ margin: '40px 0 5px 20px' }}>新增信息模板:</Title>
                </a>
                <Divider />
                <InfoTempForm onRef={this.onReloadTemp} templateToBeUpdate={this.state.templateToBeUpdate} />

            </div>
        )
    }
}




export default InfoTemplate