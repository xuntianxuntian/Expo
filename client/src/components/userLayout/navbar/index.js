import React from 'react'
import { Layout, Menu, Icon, Typography, Dropdown, Badge } from 'antd'




export const NavBar = (props)=>{

    const { Header } = Layout
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
    )
}


