import React, { Component } from 'react'
import { Table, Divider, Tag, Card, Descriptions, InputNumber, Button, Icon, Typography, Tabs, Cascader, Popconfirm } from 'antd'
import store from '../../../../store'


class AddedItemList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }


    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "itemlist"
        })
    }

    //Tab change callback  项目标签切换回调
    onTabChange = key => {
        console.log('Tab change callback ' + key)
    }

    onNumChange = value => {
        console.log(value)
    }

    render() {

        const {  Text } = Typography

        //selected list  secondery 已选项目详细表 二级目录

        const expandedRowRender = () => {
            const columns = [
                { title: '项目', dataIndex: 'item', key: 'item' },
                { title: '规格', dataIndex: 'specification', key: 'specification' },
                {
                    title: '数量', dataIndex: 'num', key: 'num', render: () => (
                        <span>
                            <InputNumber defaultValue={1} onNumChange={this.onNumChange} />
                        </span>
                    )
                },
                { title: '单价', dataIndex: 'price', key: 'price' },
                { title: '小计', dataIndex: 'cost', key: 'cost' },
                // {
                //     title: 'Status',
                //     key: 'state',
                //     render: () => (
                //         <span>
                //             <Badge status="success" />
                //             Finished
                // </span>
                //     ),
                // },

            ];

            const data = [];
            for (let i = 0; i < 3; ++i) {
                data.push({
                    item: '电力',
                    specification: '380V/30A',
                    num: '2',
                    price: '1800',
                    cost: '3600',
                });
            }
            return <Table columns={columns} dataSource={data} pagination={false} />;
        }

        

        //item list main data
        const itemListColumns = [
            { title: '展位号', dataIndex: 'booth_number', key: 'booth_number', align: 'center' },
            { title: '面积(㎡)', dataIndex: 'booth_size', key: 'booth_size', align: 'center' },
            { title: '展商名称', dataIndex: 'booth_owner', key: 'booth_owner', align: 'center' },
            { title: '服务公司', dataIndex: 'booth_server', key: 'booth_server', align: 'center' },
            { title: '费用总计', dataIndex: 'booth_cost', key: 'booth_cost', align: 'center' },
            {
                title: '', key: 'operation', render: () => <div>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                        <a href='#'>删除</a>
                    </Popconfirm>
                    <Divider type='vertical' />
                    <a href='#'>提交</a></div>
            },
        ];

        const itemListData = [];
        for (let i = 0; i < 3; ++i) {
            itemListData.push({
                key: i,
                booth_number: 'A2A012',
                booth_size: '72',
                booth_owner: '阿里云技术服务有限公司',
                booth_server: '武汉多人行展览服务有限公司',
                booth_cost: '23100',
            });
        }
        

        //Item Selected list
        const columns = [
            {
                title: '类别',
                dataIndex: 'rent_item',
                key: 'rent_item',
                render: text => <Text>{text}</Text>,
            },
            {
                title: '明细',
                dataIndex: 'rent_item_detail',
                key: 'rent_item_detail',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                )
            },
            {
                title: '数量',
                dataIndex: 'rent_item_number',
                key: 'rent_item_number',
            },
            {
                title: '金额',
                key: 'rent_item_cost',
                dataIndex: 'rent_item_cost',
            },
            {
                title: '操作',
                key: 'rent_item_operate',
                render: (text, record) => (
                    <span>
                        <Button type='primary'>提交 {record.name}</Button>
                        <Divider type="vertical" />
                        <Button type='danger' >删除</Button>
                    </span>
                ),
            },
        ]

        const data = [
            {
                key: '1',
                rent_item: '用电',
                rent_item_detail: ['380V/30A'],
                rent_item_number: '1',
                rent_item_cost: '2000',
            },
            {
                key: '2',
                rent_item: '网络宽带',
                rent_item_detail: ['20M'],
                rent_item_number: '1',
                rent_item_cost: '3500',
            }

        ]

        return (
            <div style={{ backgroundColor: 'white', padding:'10px 40px' }}>
                <Table
                    className="components-table-demo-nested"
                    columns={itemListColumns}
                    expandedRowRender={expandedRowRender}
                    dataSource={itemListData}
                    pagination={false}
                />
            </div>
        )
    }
}

export default AddedItemList