import React, { Component } from 'react'
import { Button, Typography, Divider } from 'antd'
import store from '../../../../store'

import AddRentItem from './AddRentItem.component';
import AddedItemList from './AddedItemList.component';

class ItemList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          
        }
    }


    componentDidMount() {
        console.log('asdasdadadasdasd')
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "itemlist"
        })
    }

  

    render() {

        const { Title, Paragraph, Text } = Typography

        return (
            <div style={{ backgroundColor: 'white', paddingBottom: '200px' }}>
                <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                    <Title level={4} >| 工程租赁</Title>
                    <Paragraph style={{ textIndent: '8px' }}>
                        请根据展位需求添加相应的<Text mark >工程项目 </Text>
                    </Paragraph>
                </Typography>
                <Divider style={{padding:'0 80px'}}><Text strong code style={{fontSize:'20px'}}> 项目选择 </Text></Divider>
                <AddRentItem  />
                <Divider style={{padding:'0 80px'}}><Text strong code style={{fontSize:'20px'}}> 项目清单 </Text></Divider>
                <AddedItemList />
                {/* <Table
                    className="components-table-demo-nested"
                    columns={itemListColumns}
                    expandedRowRender={expandedRowRender}
                    dataSource={itemListData}
                    pagination={false}
                /> */}
                <Button type='primary' style={{ marginLeft: '45%', marginTop: '15px' }}>结算订单</Button>
            </div>
        )
    }
}

export default ItemList