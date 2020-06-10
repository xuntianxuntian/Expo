import React, { Component } from 'react'
import { List, Collapse, Icon, Typography, Descriptions, Divider, Badge } from 'antd'
import store from '../../../../store'
import isEmpty from '../../../../utils/isEmpty'


class OrderList extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "orderlist"
        })
    }




    render() {

        const { Panel } = Collapse
        const { Text } = Typography

        //订单基本信息
        const orderData = (<div>
            <Descriptions title="费用单编号：201921633216516">
                <Descriptions.Item label="展位号"><Text code>A2A01</Text></Descriptions.Item>
                <Descriptions.Item label="提交时间">2019-12-11</Descriptions.Item>
                <Descriptions.Item label="施工单位">武汉多人行展览服务有限公司</Descriptions.Item>
                <Descriptions.Item label="总金额">22100</Descriptions.Item>
                <Descriptions.Item label="支付状态"><Badge status="success" />已完成</Descriptions.Item>
            </Descriptions>
        </div>)

        //订单项目明细
        const itemData = (<div>
            <Divider style={{ margin: '5px 0' }}></Divider>
        </div>)

        const data = [
            {
                title: '费用单编号：201921633216516',
            },
            {
                title: '费用单编号：201516416132226',
            },
            {
                title: '费用单编号：201965564665114',
            },
            {
                title: '费用单编号：201862654311613',
            },
        ]

        return (
            <div style={{ backgroundColor: 'white', paddingBottom: '200px' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <div style={{
                            width: '90%', height: '100%', borderRadius: '6px',
                            border: '1px solid', borderColor: '#f0f0f0',
                            overflow: 'hidden', marginTop: '20px', marginLeft: '5%'
                        }}>
                            <Collapse bordered={false}
                                expandIconPosition='right'
                                expandIcon={({ isActive }) => <div>
                                    <Icon style={{ fontSize: '1.5em' }} type="caret-left" rotate={isActive ? -90 : 0} />
                                    <Text style={{ fontSize: '1rem' }}>查看明细</Text>
                                </div>}>
                                <Panel header={
                                    orderData
                                } style={{ cursor: 'text' }}>
                                    {itemData}
                                </Panel>
                            </Collapse>
                        </div>
                    )}
                />

            </div>
        )
    }
}
export default OrderList