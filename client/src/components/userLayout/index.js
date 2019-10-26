import React from 'react'
import { Route} from 'react-router-dom'
import { connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import QueryExpo from './expoList/QueryExpo'
import { NavBar } from './navbar/index'
import  SiderBar  from './siderbar/index'
import { BreadCrumbList } from './content/breadcrumblist'
import { CompanyAuth } from './content/companyauth';
import loginUser from '../../actions/login/login.action'

class UserLayout extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {

    const {  Content,  Footer } = Layout
    console.log(this.props)



    return (
      <Layout style={{ height: '100%' }}>
        <NavBar />
        <Layout height={'100%'}>
          <SiderBar  handler = {this.props.login.user.handler} />
          <Layout style={{ padding: '0 24px 24px', height: '100%', paddingBottom: '100px' }}>
            <BreadCrumbList />
            <Content style={{ background: '#fff', padding: 0, margin: 0, height: '100%' }}>
              <Route path='/queryExpo' component = { QueryExpo } />
              <Route path='/companyauth' component = {CompanyAuth} />
            </Content>
            <Footer style={{ textAlign: 'center', width: '100%', height: '15px', position: 'fixed', bottom: 0, color: 'white', paddingRight: '120px', backgroundColor: 'rgb(0,21,41,1)', lineHeight: '4px' }}>云展科技 ©2019 Created by 武汉多人行展览服务有限公司</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


const mapStateToProps = state => ({
  login: state.login

})


UserLayout.propTypes = {
  login: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {  })(UserLayout)