import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Spin, message, Typography } from 'antd';
import { Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import loginUser from '../../../actions/login/login.action'

import '../../../css/auth/login.component.css'
// import isEmpty from '../../../utils/isEmpty';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: false,
      loginError: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      isFetching: true,
      loginError: ''
    })
    const { email, password } = this.props.form.getFieldsValue()
    this.props.loginUser({ email, password })
      .then(
        res => {
          this.setState(
            {
              ...this.state,
              isFetching: false
            }
          )
          message.success({ content: res, duration: 2, key: 'loginsuccess' })
          window.location.replace('/myExpo')
        }
      ).catch(
        err => {
          this.setState(
            {
              ...this.state,
              loginError: err,
              isFetching: false
            }
          )
          message.error({ content: err, duration: 3, key: 'loginfailed' })
        }
      )

  }





  render() {
    const spinIcon = <Icon type={this.props.registerDone ? "check" : "loading"} style={{ fontSize: 24, color: "white" }} />
    const { getFieldDecorator } = this.props.form;
    const { Text } = Typography

    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form" >
          <Form.Item
          // extra={this.props.login.error.email ? this.props.login.error.email : ''}
          >
            {getFieldDecorator('email', {
              // rules: [{ required: true, message: '请输入邮箱或手机号码' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入邮箱或手机号码"
              />,
            )}
          </Form.Item>
          <Form.Item
          // extra={this.props.login.error.password ? this.props.login.error.password : ''}
          >
            {getFieldDecorator('password', {
              // rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />
          ,
            )}
          </Form.Item>
          <Form.Item>
            <div>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <div className="login-form-forgot">
                <Link to="">忘记密码?</Link>
                <span>or</span>
                <Link to="">现在注册</Link>
              </div>
            </div>

          </Form.Item>
          <Text type='danger'>{this.state.loginError}</Text>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录{this.state.isFetching ? <Spin indicator={spinIcon} size="small" /> : ''}
          </Button>
        </Form>

      </div>

    )
  }
}


const mapStateToProps = state => ({
  login: state.login,
})

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);


Login.propTypes = {
  login: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login))