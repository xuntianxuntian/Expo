import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Typography, Dropdown, Badge } from 'antd'
import QueryExpo from './expoList/QueryExpo'
import { NavBar } from './navbar/index'
import { SiderBar } from './siderbar/index'
import { BreadCrumbList } from './content/breadcrumblist'
import { companyAuthUpload } from './content/companyauth';

class UserLayout extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {

    const {  Content,  Footer } = Layout


    const userMenu = (<Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px', float: 'right' }}>
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>)


    return (
      <Layout style={{ height: '100%' }}>
        <NavBar />
        <Layout height={'100%'}>
          <SiderBar />
          <Layout style={{ padding: '0 24px 24px', height: '100%', paddingBottom: '100px' }}>
            <BreadCrumbList />
            <Content style={{ background: '#fff', padding: 0, margin: 0, Height: '100%', }}>
              <Route path='/queryExpo' component = { QueryExpo } />
              <Route path='/companyauth' component = {companyAuthUpload} />
            </Content>
            <Footer style={{ textAlign: 'center', width: '100%', height: '15px', position: 'fixed', bottom: 0, color: 'white', paddingRight: '120px', backgroundColor: 'rgb(0,21,41,1)', lineHeight: '4px' }}>云展科技 ©2019 Created by 武汉多人行展览服务有限公司</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }

}

export default UserLayout;
