import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import loginUser from '../../../actions/login/login.action'

import '../../../css/auth/login.component.css'
import Axios from 'axios';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {}
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.form.validateFields((err, values) => {
      if (err) return
      this.props.loginUser(values, this.props.history)
    })
    const error = this.props.login.error
    this.setState({
      error
    })
    console.log(error.password)
  }

  validatorInput = (rule, value, callback) => {
    let err = this.state.error.password
    console.log('111111' + err)
    if (err) {
      callback('asdad')
    } else {
      callback()
    }
  }

  componentWillMount() {
    if (localStorage.token) {
      this.props.history.push('/')
    }
  }
  componentWillReceiveProps(nextProp) {


  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form" >
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱或手机号码' }, { validator: (rule, value, callback) => callback(this.state.error.password) }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入邮箱或手机号码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <div><Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              /><div>{this.state.error.password ? "密码错误" : ""}</div></div>
              ,
            )}
          </Form.Item>
          <Form.Item>
            <div>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码{this.state.error.password}</Checkbox>)}
              <div className="login-form-forgot">
                <Link to="">忘记密码?</Link>
                <span>or</span>
                <Link to="">现在注册</Link>
              </div>
            </div>

          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form>
      </div>

    );
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