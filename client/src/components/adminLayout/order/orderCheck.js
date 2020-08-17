import React from 'react'
import axios from 'axios'
import { Typography, Divider, Tag, Modal, Form, Table, Input, Button, Icon} from 'antd'
import store from '../../../store'
import Highlighter from 'react-highlight-words';

class OrderCheck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModel: false,
            searchText: '',
            searchedColumn: '',
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "orderCheck"
        })
    }

    onChangeExpo = (e) => {
        e.preventDefault()
        console.log(e)
        this.setState({
            ...this.state,
            showModel: true
        })
    }

    handleModelCancel = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            showModel: false
        })
    }
    handleModelOk = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            showModel: false
        })
    }
    

    render() {

        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: '展位号',
                dataIndex: 'boothId',
                key: 'boothId',
            },
            {
                title: '下单公司',
                dataIndex: 'orderCompany',
                key: 'orderCompany',

            },
            {
                title: '下单时间',
                dataIndex: 'orderDate',
                key: 'orderDate',
            },
            {
                title: '费用合计',
                dataIndex: 'totalCost',
                key: 'totalCost',
                render: text => (<span >{text}</span>),
            },
            {
                title: '费用类型',
                dataIndex: 'orderType',
                key: 'orderType',
            },
            {
                title: '订单状态',
                dataIndex: 'orderStatus',
                key: 'orderStatus',
                render: text => (<Tag color='#0040FF'>{text}</Tag>)
            },
            {
                title: '',
                key: 'action',
                render: text => <span><a>查看凭单 </a>|<a> 确认收款</a></span>,
            },
        ];

        const boothData = [
            {
                key: '1',
                orderId: '20156532556',
                boothId: 'A1A05',
                orderCompany: '武汉亚美空间展览服务有限公司',
                orderDate: '2017-2-16',
                totalCost: '120065',
                orderStatus:'未下单',
                orderType: '基础费用',
            },
            {
                key: '2',
                orderId: '201346534256',
                boothId: 'C1C11',
                orderCompany: '武汉多人行展览服务有限公司',
                orderDate: '2018-9-11',
                totalCost: '12335',
                orderStatus:'已打款',
                orderType: '基础费用',
            },
            {
                key: '3',
                orderId: '201456556',
                boothId: 'B1A15',
                orderCompany: '武汉汉展天地展览服务有限公司',
                orderDate: '2017-6-16',
                totalCost: '3065',
                orderStatus:'已收款',
                orderType: '押金',
            },
        ];

        const { Paragraph, Text, Title } = Typography

        return (
            <div style={{ backgroundColor: 'white', paddingBottom: '20px' }}>

                <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                    <Title level={4} >| 订单总览</Title>
                    <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                        查看展位的费用<Text mark > 订单信息和缴费情况 </Text>。
                        </Paragraph>
                </Typography>
                <Divider style={{ margin: '10px' }} />
                <div style={{ padding: '0 20px', marginTop: '40px', fontSize: '14px' }}>
                    <Text strong style={{ marginRight: '4px' }}>当前展会:</Text>
                    <Tag color='blue'>第五届世界大健康博览会</Tag>
                    <Button size='small' icon='swap' onClick={this.onChangeExpo}>切换</Button>
                </div>

                <div style={{ padding: '10px 20px', margin: '20px 30px', fontSize: '14px', border: '1px solid rgb(230,230,230)', borderRadius: '3px' }}>
                    <Text strong style={{ marginRight: '4px' }}>搜索订单:</Text>
                    <Form layout='inline' style={{ margin: '10px 0' }}>

                        <Form.Item label='订单号'>
                            <Input placeholder="请输入订单号" />
                        </Form.Item>
                        <Form.Item label='展位号'>
                            <Input placeholder="请输入展位号" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={boothData}
                    ></Table>
                </div>

                <Modal
                    title="选择展会"
                    visible={this.state.showModel}
                    onOk={this.handleModelOk}
                    onCancel={this.handleModelCancel}
                >
                    内容
                </Modal>


            </div >
        )
    }
}

export default OrderCheck

