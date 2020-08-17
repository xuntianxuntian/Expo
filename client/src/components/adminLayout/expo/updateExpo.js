import React, { useState, useEffect } from 'react'
import store from '../../../store'
import { Form, Collapse, Table, Input, Divider, Typography, Button } from 'antd'
import { AddExpo } from './addExpo';
import axios from 'axios'

class formComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expoSelected: false,
            formInfo: [],
            formInfoSelected: {},
            tableData: []
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "updateExpo"
        })

        axios.get('/apf/admin/getExpo.json').then(res => {
            let tableData = []
            let formInfo = []
            if (res.data.length) {
                res.data.forEach((expo, i) => {
                    let { expoName, expoUrl, openTime, closeTime, hostBy, desc, createdBy, cid } = expo
                    let info = {}
                    for (let key in expo.fee) {
                        info[key] = expo.fee[key]
                    }
                    info = { ...info, expoName, expoUrl, openTime, closeTime, hostBy, desc, createdBy, cid }
                    formInfo.push(info)
                    tableData.push(
                        {
                            key: `${i}`,
                            expoName: expo.expoName,
                            cid: expo.cid,
                            createdAt: expo.createdAt,
                        }
                    )
                })
            }
            this.setState({ ...this.state, tableData, formInfo })
        }).catch(err => console.log(err))



    }

    onUpdateClick(e, cid) {
        e.preventDefault()
        console.log(this.state.tableData)
        this.setState({
            ...this.state,
            expoSelected: true
        })
        if (this.state.formInfo.length) {
            this.state.formInfo.forEach(info => {
                if (info.cid === cid) {
                    let formInfoSelected = info
                    console.log(info)
                    this.setState({
                        ...this.state,
                        expoSelected: true,
                        formInfoSelected
                    })
                }
            })
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault()

    }


    render() {

        const { Title, Paragraph, Text } = Typography
        const { Panel } = Collapse
        const { getFieldDecorator } = this.props.form
        // const { TextArea } = Input


        const tableHeader = [
            {
                title: '展会名称',
                dataIndex: 'expoName',
                key: 'expoName',
            },
            {
                title: '展会编号',
                dataIndex: 'cid',
                key: 'cid',
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: '修改',
                key: 'update',
                render: (text, record) => (
                    <span>
                        <a onClick={e => this.onUpdateClick(e, record.cid)}>修改</a>
                    </span>
                ),
            },
        ];


        return (
            <div style={{ padding: '0 20px', backgroundColor: 'white' }}>
                <Typography style={{ paddingTop: '20px' }}>
                    <Title level={4} >| 修改展会</Title>
                    <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                        请仔细核对需要修改的信息，确保在对用户开放前信息的<Text mark > 正确以及安全 </Text>。
                    </Paragraph>
                </Typography>

                <div style={{ padding: '0 20px', marginBottom: '15px', order: 'solid rgb(235,235,235) 1px', borderRadius: '4px' }}>
                    <Form layout="inline" >
                        <Form.Item label='展会名称'>
                            {getFieldDecorator('expoName', {})(
                                <Input
                                    placeholder="展会名称"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label='展会编号'>
                            {getFieldDecorator('cid', {})(
                                <Input
                                    placeholder="展会编号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询展会
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider style={{ margin: '10px 0' }} />
                    <div style={{ padding: '10px 15px' }}>
                        <Table dataSource={this.state.tableData} columns={tableHeader} pagination={{ size: 'small' }} />
                    </div>

                </div>
                <div >
                    <Collapse activeKey={this.state.expoSelected ? 1 : null}>
                        <Panel header={<Text strong>编辑信息</Text>} key="1" disabled={!this.state.expoSelected} forceRender={true}>
                            <AddExpo formInfo={this.state.formInfoSelected} />
                        </Panel>
                    </Collapse>

                </div>

            </div>

        )

    }
}

export const UpdateExpo = Form.create({ name: 'UpdateExpo' })(formComponent)