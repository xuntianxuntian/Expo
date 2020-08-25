import React, { Component } from 'react'
import { Card, Descriptions, Button, Icon, Tabs, Cascader, message, Tag } from 'antd'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment'

import electric from '../../../../electric.png'
import waterandgas from '../../../../waterandgas.png'
import internet from '../../../../internet.png'


class AddRentItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            boothList: [],
            selectbid: '',
            orderExpire: 0,
            isSpecial: false,
            itemProvider: {
                elec: [],//220-15s 220-5 220-15 380-15 380-20 380-30 380-60 380-100 
                water: [],//
                gas: [],//8L 20L 30L 50L
                network: []//5M  10M 20M 50M 100M
            },
            fee: {}
        }
    }

    componentDidMount() {
        const eid = localStorage.getItem('current_eid')
        if (eid) {
            axios.get(`api/user/expo/fee/${eid}`).then(
                res => {
                    if (res.status == 200) {
                        axios.get(`/api/user/booth/list/${eid}`).then(
                            sres => {
                                if (sres.status == 200) {
                                    let b = sres.data.boothList.map((booth, i) => { return { ...booth, key: i } })
                                    const uid = jwt_decode(localStorage.getItem('token')).uid
                                    if (res.data.fee.specList.includes(uid)) {
                                        this.setState(
                                            {
                                                ...this.state,
                                                isLoading: false,
                                                fee: res.data.fee,
                                                boothList: b,
                                                isSpecial: true,
                                                orderExpire: res.data.fee.orderExpire
                                            }
                                        )
                                    } else {
                                        this.setState(
                                            {
                                                ...this.state,
                                                isLoading: false,
                                                fee: res.data.fee,
                                                boothList: b,
                                                orderExpire: res.data.fee.orderExpire
                                            }
                                        )
                                    }
                                }
                            }
                        )
                    }
                }
            ).catch(err => message.error({ content: 'err.response.data', key: 'cantGetFeeOrBoothList' }))
        } else {
            message.error({ content: '请选择当前要参加的展会!', key: 'cantFindEid' })
            window.location.replace('/myExpo')
        }
    }


    onTabChange = key => {
        console.log('Tab change callback ' + key)
    }

    onNumChange = value => {
        console.log(value)
    }


    onBoothChange = value => {
        console.log(value)
        if (value[0]) {
            this.setState({
                ...this.state,
                selectbid: value[0],
            })
        }

    }


    render() {

        const { selectbid, fee, boothList, orderExpire } = this.state
        const { TabPane } = Tabs
        const { Meta } = Card
        let seletedbooth = null
        let customBase = ''
        let baseCost = ''
        let authColor = ''
        let designColor = ''
        let authText = '-'
        let designText = '-'
        console.log(seletedbooth)
        boothList.some(
            booth => {
                if (booth.bid == selectbid) {
                    seletedbooth = booth
                    return true
                }
            }
        )

        const options = this.state.boothList.map(
            booth => {
                return { value: booth.bid, label: booth.bName.fullName }
            }
        )
        if (seletedbooth && fee.base && fee.custom) {
            authColor = seletedbooth.auth.status == 'commited' ? 'blue' : seletedbooth.auth.status == 'success' ? 'green' : seletedbooth.auth.status == 'failed' ? 'red' : ''
            designColor = seletedbooth.design.status == 'commited' ? 'blue' : seletedbooth.design.status == 'success' ? 'green' : seletedbooth.design.status == 'failed' ? 'red' : ''
            authText = seletedbooth.auth.status == 'commited' ? '审核中' : seletedbooth.auth.status == 'success' ? '已通过' : seletedbooth.auth.status == 'failed' ? '审核失败' : "未提交资料"
            designText = seletedbooth.design.status == 'commited' ? '审核中' : seletedbooth.design.status == 'success' ? '已通过' : seletedbooth.design.status == 'failed' ? '审核失败' : "未提交资料"
            const now = moment.now()
            customBase = fee.custom && fee.custom.length ? fee.custom.map(
                (item, i) => {
                    if (item.itemType == 'base') {
                        let cost = this.state.isSpecial ?
                            now > orderExpire ?
                                item.feeType.feeNum.exceedSpec :
                                item.feeType.feeNum.normalSpec :
                            now > orderExpire ?
                                item.feeType.feeNum.exceed :
                                item.feeType.feeNum.normal
                        return (
                            <Descriptions.Item label={`${item.itemName}`} key={'custom' + i.toString()}>
                                {item.useSize ? parseInt(cost) * parseFloat(seletedbooth.bSize) : cost}元
                            </Descriptions.Item>
                        )
                    }
                }) : null
            baseCost = [{ key: 'management', name: '特装管理费' }, { key: 'deposite', name: '押金' }].map(
                (item, i) => {
                    if (item.key == 'management') {
                        let cost = this.state.isSpecial ?
                            now > orderExpire ?
                                fee.base.management.exceedSpec :
                                fee.base.management.normalSpec :
                            now > orderExpire ?
                                fee.base.management.exceed :
                                fee.base.management.normal
                        return (
                            <Descriptions.Item label={`${item.name}`} key={'baseManagement' + i.toString()}>
                                {parseInt(cost) * parseFloat(seletedbooth.bSize)}元
                            </Descriptions.Item>
                        )
                    } else {
                        //将押金的所属范围找出来，确定选定展位的押金数
                        //生成数组 在推入当前选择展位的面积数据，再进行排序，最后就行循环检测，有等于当前展位面积或者下一个 就是应该缴纳的押金
                        let depositeIndex
                        let deposite
                        const depositeRange = fee.base.deposite.feeType.map(
                            (dep) => {
                                const strlength = dep.fieldName.length
                                return { size: parseInt(dep.fieldName.slice(1, strlength - 1)), feeNum: dep.feeNum }
                            }
                        )
                        depositeRange.push({ size: seletedbooth.bSize })
                        depositeRange.sort(function (a, b) { return a.size - b.size }).some(
                            (value, i) => {
                                if (value.size == seletedbooth.bSize) {
                                    depositeIndex = i
                                    return true
                                }
                            }
                        )
                        if (depositeRange[depositeIndex].feeNum) {
                            deposite = depositeRange[depositeIndex].feeNum
                        } else {
                            deposite = depositeRange[depositeIndex + 1].feeNum
                        }
                        let cost = this.state.isSpecial ?
                            now > orderExpire ?
                                deposite.exceedSpec :
                                deposite.normalSpec :
                            now > orderExpire ?
                                deposite.exceed :
                                deposite.normal


                        return (
                            <Descriptions.Item label={`${item.name}`} key={'baseDeposite' + i.toString()}>
                                {cost}元
                            </Descriptions.Item>
                        )
                    }
                }
            )
        }








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

        console.log(baseCost.toString())
        return (
            <div style={{ padding: '10px 40px' ,marginBottom:'20px'}}>
                <Cascader
                    options={options}
                    onChange={value => this.onBoothChange(value)}
                    placeholder='请选择展位'
                    notFoundContent='暂时还未添加展位' />
                <Tabs defaultActiveKey="1" onChange={this.onTabChange} >
                    <TabPane tab="展位基本费用" key="baseCost">
                        <div style={{ margin: '30px 0 5px 0', width: '100%' }}>
                            <Descriptions title={`展位号 : ${seletedbooth ? seletedbooth.bName.fullName : ' - '}`} bordered='true' column={2}>
                                <Descriptions.Item label="展商名称" span={1}>{seletedbooth ? seletedbooth.bOwner : ' - '}</Descriptions.Item>
                                <Descriptions.Item label="展位面积" span={1}>{seletedbooth ? seletedbooth.bSize : ' - '} ㎡</Descriptions.Item>
                                <Descriptions.Item label="展位委托" span={1}><Tag color={authColor}>{authText}</Tag></Descriptions.Item>
                                <Descriptions.Item label="报馆审核" span={1}><Tag color={designColor}>{designText}</Tag></Descriptions.Item>
                                {baseCost}
                                {customBase}
                            </Descriptions>
                        </div>
                        <Button type='primary' style={{ float: 'right', marginRight: '1%', marginTop: '25px' }}>加入清单</Button>
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