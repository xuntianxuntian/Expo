import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import GetExpo from './expo/GetExpo'
import { NavBar } from './navbar/index'
import SiderBar from './siderbar/index'
import MyExpo from './expo/MyExpo';
import UserCompanyFrom from '../../components/userLayout/content/userCompany/index.userCompany';
import Booth from './content/profile/Booth.component';
import BoothDesign from './content/profile/BoothDesign/BoothDesign.component';
import ItemList from './content/rentlist/ItemList.component'
import OderList from './content/rentlist/OderList.component'

import toogleHandler from '../../actions/toogleSiderBar.action'
import { changeToBoothList } from '../../actions/changeBoothList.action'





class UserLayout extends React.Component {
  // constructor(props) {
  //   super(props)
  // }


  componentDidMount() {
    //首次进入加载boothList的数据
    this.props.changeToBoothList(JSON.parse(localStorage.getItem('boothList')))
  }

  render() {


    const { Content } = Layout



    return (
      <Layout style={{ height: '100%' }}>
        <NavBar />
        <Layout height={'100%'}>
          <SiderBar />
          <Layout style={{ padding: '0 24px 24px', height: '100%', paddingBottom: '50px' }}>
            {/* <BreadCrumbList /> */}
            <Content style={{ background: '#fff', padding: 0, margin: 0, height: '100%' }}>
              <Route path='/getExpo' component={GetExpo} />
              <Route path='/myExpo' component={MyExpo} />
              <Route path="/qualification" component={UserCompanyFrom} />
              <Route path="/booth" component={Booth} />
              <Route path="/boothDesign" component={BoothDesign} />
              <Route path="/itemlist" component={ItemList} />
              <Route path="/orderlist" component={OderList} />
            </Content>
            {/* <Footer style={{ textAlign: 'center', width: '100%', height: '15px', position: 'fixed', bottom: 0, color: 'white', paddingRight: '120px', backgroundColor: 'rgb(0,21,41,1)', lineHeight: '4px' }}>云展科技 ©2019 Created by 武汉多人行展览服务有限公司</Footer> */}
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


const mapStateToProps = state => ({
  sideLocation: state.toogleSiderBar.location
})


UserLayout.propTypes = {
  sideLocation: PropTypes.string.isRequired,
  toogleHandler: PropTypes.func.isRequired,
  changeToBoothList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { toogleHandler, changeToBoothList })(UserLayout)