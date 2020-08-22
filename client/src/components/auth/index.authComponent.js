import React from 'react'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import '../../css/auth/index.css'
import Login from './login/Login.component';
import  RegisterForm  from './register/Register.component'
import registerToLogin from '../../actions/register/registerToLogin.action'
import { Tabs,Icon } from 'antd'

 class AuthComponent extends React.Component {
     constructor(props){
         super(props)
     }

    changeTab = (tabKey)=>{
        this.props.registerToLogin(tabKey.toString())
    }

    render() {
        const { TabPane } = Tabs;
        return (
            <div className="container">
                <div className="sider-access">
                    <h2>会务管理系统入口</h2>
                    <div className="loginContainer">
                        <Tabs defaultActiveKey='1' activeKey={this.props.toLogin.tabKey} onTabClick = {this.changeTab}>
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

const mapStateToProps = state => ({
    toLogin:state.toLogin

})


AuthComponent.propTypes = {
    toLogin:PropTypes.object.isRequired,
    registerToLogin: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, { registerToLogin })(AuthComponent)