import React, { Component } from 'react'
import { Typography, Divider, Tabs } from 'antd'
import store from '../../../../../store'
import '../../../../../css/content/uploads.inlinestyle.css'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { switchToInfoTemp, switchToCheckList, switchToUpload } from '../../../../../actions/changeBoothDesignTab.action'

import DesignUploads from './DesignUploads.component'
import DesignCheckingList from './DesignCheckingList.component';
import InfoTemplate from './InfoTemplate.component';

class BoothDesign extends Component {

    constructor(props) {
        super(props)
        this.state = {
            boothToBeUpdate: ''
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
        switch (key) {
            case '0':
                return this.props.switchToUpload()
            case '1':
                return this.props.switchToCheckList()
            case '2':
                return this.props.switchToInfoTemp()
            default:
                return null
        }
    }

    onUpdateBooth = (bName) => {
        if (bName){
            console.log('childddddd')
            this.setState(
                {
                    ...this.state,
                    boothToBeUpdate:bName
                }
            )
        }
    }


    render() {

        const { Title, Paragraph, Text } = Typography
        const { TabPane } = Tabs


        function callback(key) {
            console.log(key);
        }

        return (
            <div >
                <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                    <Title level={4} >| 展位施工审核</Title>
                    <Paragraph style={{ textIndent: '8px' }}>
                        请根据参展手册或者平台规定上传<Text mark > 施工效果图及安全责任书 </Text>等文件。
                    </Paragraph>
                </Typography>
                <Divider />
                <div style={{ padding: '0 30px 10px 30px', width: '100%', backgroundColor: 'white' }}>
                    <Tabs defaultActiveKey='1' onChange={e => this.onTabClick(e)} activeKey={this.props.selectedTab.toString()}>
                        <TabPane tab="展位申报" key="0">
                            <DesignUploads boothToBeUpdate={this.state.boothToBeUpdate} />
                        </TabPane>
                        <TabPane tab="审核列表" key="1">
                            <DesignCheckingList onRef={this.onUpdateBooth} />
                        </TabPane>
                        {/* <TabPane tab="完成审核列表" key="3">
                        </TabPane> */}
                        <TabPane tab="信息模板" key="2">
                            <InfoTemplate />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedTab: state.selectedTab,
})

BoothDesign.propTypes = {
    selectedTab: PropTypes.number.isRequired,
    switchToInfoTemp: PropTypes.func.isRequired,
    switchToCheckList: PropTypes.func.isRequired,
    switchToUpload: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, { switchToInfoTemp, switchToCheckList, switchToUpload })(BoothDesign)

