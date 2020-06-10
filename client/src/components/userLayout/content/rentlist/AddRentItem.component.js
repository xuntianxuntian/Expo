import React, { Component } from 'react'
import {  Card, Descriptions, Button, Icon, Typography, Tabs, Cascader } from 'antd'
import isEmpty from '../../../../utils/isEmpty'

import electric from '../../../../electric.png'
import waterandgas from '../../../../waterandgas.png'
import internet from '../../../../internet.png'


class AddRentItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectBoothName: '',
            selectBoothId: '',
            itemProvider:{
                elec:[],//220-15s 220-5 220-15 380-15 380-20 380-30 380-60 380-100 
                water:[],//
                gas:[],//8L 20L 30L 50L
                network:[]//5M  10M 20M 50M 100M
            }
        }
    }

    componentDidMount() {

    }


    onTabChange = key => {
        console.log('Tab change callback ' + key)
    }

    onNumChange = value => {
        console.log(value)
    }


    onBoothChange = value => {
        console.log(this.state.selectBoothName)

        for (let i = 0; i < this.props.boothList.length; i++) {
            if (this.props.boothList[i].boothId == value[0]) {
                return this.setState({
                    ...this.state,
                    selectBoothName: this.props.boothList[i].boothName
                })
            }
        }
        if (!isEmpty(value[0])) {
            return this.setState({
                ...this.state,
                boothId: value[0],
                uploadDisabled: false
            })
        }
        return this.setState({
            ...this.state,
            uploadDisabled: true
        })
    }


    render() {

        const { TabPane } = Tabs
        const { Title, Paragraph, Text } = Typography
        const { Meta } = Card


        const options = [{value:'656',label:'asdasd'},{value:'asdas',label:'asdqwdq'}]
        
        // this.props.boothList.map(booth => {
        //     return {
        //         value: booth.boothId,
        //         label: booth.boothId
        //     }
        // })

        //base cost table jsx

        const baseCost = (
            <div style={{ margin: '30px 0 5px 0', width: '100%' }}>
                <Descriptions title={'展位号：A2A02'} bordered='true'>
                    <Descriptions.Item label="展位面积" span={2}>{72} ㎡</Descriptions.Item>
                    <Descriptions.Item label="施工押金">{10000} 元</Descriptions.Item>
                    <Descriptions.Item label="施工管理费" span={2}>{2000}元</Descriptions.Item>
                    <Descriptions.Item label="审图费">{1200} 元</Descriptions.Item>
                    <Descriptions.Item label="证件费">{200}元</Descriptions.Item>
                </Descriptions>
            </div>
        )


        //electric Card jsx
        const electricCard = (<Card
            size='small'
            style={{ width: 250, height: 270 }}
            cover={
                <img
                    alt="electric"
                    src={electric}
                    style={{ height: 150, width: 200, marginLeft: '25px' }}
                />
            }
            actions={[
                <Icon type="minus" key="minus" />,
                '1',
                <Icon type="plus" key="plus" />,
            ]}
        >
            <Meta
                title="展期用电"
                description="380V/30A"
            />
        </Card>)

        //waterandgas Card
        const waterandgasCard = (<Card
            size='small'
            style={{ width: 250, height: 270 }}
            cover={
                <img
                    alt="waterandgas"
                    src={waterandgas}
                    style={{ height: 150, width: 180, marginLeft: '35px' }}
                />
            }
            actions={[
                <Icon type="minus" key="minus" />,
                '1',
                <Icon type="plus" key="plus" />,
            ]}
        >
            <Meta
                title="压缩空气"
                description="10Mpa"
            />
        </Card>)

        //internet Card
        const internetCard = (<Card
            size='small'
            style={{ width: 250, height: 270 }}
            cover={
                <img
                    alt="internet"
                    src={internet}
                    style={{ height: 150, width: 180, marginLeft: '35px' }}
                />
            }
            actions={[
                <Icon type="minus" key="minus" />,
                '1',
                <Icon type="plus" key="plus" />,
            ]}
        >
            <Meta
                title="网络宽带"
                description="20M"
            />
        </Card>)


        return (
            <div style={{padding:'10px 40px'}}>
                <Cascader
                    options={options}
                    onChange={value => this.onBoothChange(value)}
                    placeholder='请选择展位'
                    notFoundContent='暂时还未添加展位' />
                <Tabs defaultActiveKey="1" onChange={this.onTabChange} style={{ height: '380px' }}>
                    <TabPane tab="展位基本费用" key="baseCost">
                        {baseCost}
                        <Button type='primary' style={{ float: 'right', marginRight: '20%', marginTop: '10px' }}>加入清单</Button>
                    </TabPane>
                    <TabPane tab="电力租赁" key="electric">
                        {electricCard}
                    </TabPane>
                    <TabPane tab="用水及用气" key="gasandwater">
                        {waterandgasCard}
                    </TabPane>
                    <TabPane tab="网络宽带" key="internet">
                        {internetCard}
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

export default AddRentItem