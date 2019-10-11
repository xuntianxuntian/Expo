import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Typography, Dropdown, Badge } from 'antd'

class App extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {

    const { SubMenu } = Menu
    const { Header, Content, Sider,Footer } = Layout
    const { Title } = Typography


    const userMenu = (<Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px', float: 'right' }}>
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>);


    return (
      <Layout style={{height:'100%'}}>
        <Header className="header">
          <Icon type="aliyun" style={{ color: 'white', fontSize: '50px', marginTop: "8px", display: 'inline-block' }} />
          <div style={{ marginLeft: "18px", position: "fixed", left: '100px', top: '12px' }}>
            <Title level={2} style={{ color: 'white' }}>展会展务管理平台</Title>
          </div>
          <div style={{ float: 'right', marginTop: '8px' }}>
            <Dropdown overlay={userMenu} >
              <span style={{ fontSize: '18px', color: 'white', marginRight: '50px', marginBottom: '-10px', }}>
                <Icon type="user" style={{ fontSize: '23px' }} />
                我的账户
              </span>
            </Dropdown>
            <Dropdown overlay={userMenu} style={{ marginLeft: '60px' }}>
              <span style={{ fontSize: '18px', color: 'white', marginRight: '50px', marginBottom: '-10px' }}>
                <Badge count={10} offset={[95, 13]} >
                  <Icon type="message" style={{ fontSize: '23px' }} />
                </Badge>
                系统消息
              </span>
            </Dropdown>
            <Dropdown overlay={userMenu}>
              <span style={{ fontSize: '18px', color: 'white', marginRight: '20px', marginBottom: '-10px' }}><Icon type="setting" style={{ fontSize: '23px' }} /> 设 置</span>
            </Dropdown>
          </div>
        </Header>
        <Layout height={'100%'}>
          <Sider width={200} height={'100%'} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    展会选择
              </span>
                }
              >
                <Menu.Item key="1">当前展会选择</Menu.Item>
                <Menu.Item key="2">展会添加</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    资质手续
              </span>
                }
              >
                <Menu.Item key="5">我的资质</Menu.Item>
                <Menu.Item key="6">我的展位</Menu.Item>
                <Menu.Item key="7">我的申报</Menu.Item>
                <Menu.Item key="8">其他信息</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    工程租赁
              </span>
                }
              >
                <Menu.Item key="9">添加项目</Menu.Item>
                <Menu.Item key="10">费用结算</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' ,height:'100%'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                mHeight: '100%',
              }}
            >
              Content
        </Content>
          <Footer style={{ textAlign: 'center',width:'100%', position:'fixed',bottom:'0px'}}>云展科技 ©2019 Created by 武汉多人行展览服务有限公司</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }

}

export default App;
