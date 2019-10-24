import React from 'react'
import '../../css/auth/index.css'
import Login from './login/Login.component';
import { RegisterForm } from './register/Register.component'
import { Tabs,Icon } from 'antd'

export default class AuthComponent extends React.Component {



    render() {


        const { TabPane } = Tabs;

        return (
            <div className="container">
                <div className="sider-access">
                    <h2>会务管理系统入口</h2>
                    <div className="loginContainer">
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span className = "loginTab">
                                        <Icon type="user" />
                                        登录
                                    </span>
                                }
                                key="1">
                                <Login />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span className = "registerTab">
                                        <Icon type="usergroup-add" />
                                        注册
                                    </span>
                                }
                                key="2">
                                <RegisterForm />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
