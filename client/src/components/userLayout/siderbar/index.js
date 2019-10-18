import React from 'react'
import { Layout, Menu,  Icon } from 'antd'



export const SiderBar = (props) => {

    const { SubMenu } = Menu
    const { Sider } = Layout



    return (
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
    )
}