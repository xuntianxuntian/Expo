import React, { Component } from 'react'
import { Table, Upload, Button, Menu, Dropdown, Icon } from 'antd';



class DesignFailedList extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        const menu = (
            <Menu>
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
            </Menu>
        )

        const onReCheckButton = (value) => {
            console.log(value)
        }

        const expandedRowRender = () => {

            const columns = [
                { title: '未通过项目', dataIndex: 'failedItem', key: '1' },

                { title: '审核说明', dataIndex: 'checkInfo', key: '2',width:'300px' },
                {
                    title: '重新上传',
                    key: '3',
                    render: () => {
                        const props2 = {
                            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                            name: 'yyzz',
                            listType: 'text',
                            defaultFileList: [],
                            className: 'upload-list-inline-reUpload',
                            headers: {
                                authorization: localStorage.token,
                            },
                            multiple: true
                        }
                        return (
                            < Upload {...props2} style={{ width: '100%' }} >
                                <Button disabled={this.state.uploadDisabled}>
                                    <Icon type="upload" /> 上传文件
                            </Button>
                            </Upload >)
                    },
                },

            ]

            const data = []
            for (let i = 0; i < 3; ++i) {
                data.push({
                    key: i,
                    checkInfo: '2014-12-24 23:12:00',
                    failedItem: 'This is production name',
                });
            }
            return <Table columns={columns} dataSource={data} pagination={false} />
        }

        const columns = [
            { title: '展位号', dataIndex: 'name', key: 'name' },
            { title: '展位名称', dataIndex: 'platform', key: 'platform' },
            { title: '提交时间', dataIndex: 'version', key: 'version' },
            { title: '审核时间', dataIndex: 'upgradeNum', key: 'upgradeNum' },
            { title: '审核结果', dataIndex: 'creator', key: 'creator' } ,
            {
                title: '提交',
                dataIndex: 'reCheckButton',
                key: 'reCheckButton',
                render: (value) => (
                    <Button onClick={value => { onReCheckButton(value) }} >提交审核</Button>
                ),
            },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                name: 'Screem',
                platform: 'iOS',
                version: '10.3.4.5654',
                upgradeNum: 500,
                creator: 'Jack',
                createdAt: '2014-12-24 23:12:00',
            })
        }
        return (<Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={data}
        />
        )
    }
}


export default DesignFailedList 