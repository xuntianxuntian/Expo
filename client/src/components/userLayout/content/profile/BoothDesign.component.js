import React, { Component } from 'react'
import { Typography, Divider, Tabs } from 'antd'
import store from '../../../../store'
import isEmpty from '../../../../utils/isEmpty';
import '../../../../css/content/uploads.inlinestyle.css'

import DesignUploads from './DesignUploads.component'
import DesignCheckingList from './BoothDesign/DesignCheckingList.component';

class BoothDesign extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "boothDesign"
        })
    }

    onTabClick = (key) => {
        console.log(key);
    }


    render() {

        const { Title, Paragraph, Text } = Typography
        const { TabPane } = Tabs

        return (
            <div >
                <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                    <Title level={4} >| 展位施工审核</Title>
                    <Paragraph style={{ textIndent: '8px' }}>
                        请根据参展手册或者平台规定上传<Text mark > 施工效果图及安全责任书 </Text>等文件。
                    </Paragraph>
                </Typography>
                <Divider />
                <div style={{ padding:'0 30px 10px 30px',width:'100%',backgroundColor:'white'}}>
                    <Tabs defaultActiveKey="1" onChange={e => this.onTabClick(e)}>
                        <TabPane tab="展位申报" key="1">
                            <DesignUploads />
                        </TabPane>
                        <TabPane tab="审核中" key="2">
                            <DesignCheckingList />
                        </TabPane>
                        <TabPane tab="未通过" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="已通过" key="4">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}


export default BoothDesign
