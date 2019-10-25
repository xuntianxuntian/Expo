import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginReducer } from '../../../reducers/auth/login.reducer'
import loginUser from '../../../actions/login/login.action'

import '../../../css/auth/login.component.css'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.props.loginUser(values)
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form" >
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱或手机号码' }],
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
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form>
      </div>

    );
  }
}


const mapStateToProps = state => ({
  login:state.login
})
const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default connect(mapStateToProps,{loginUser})(Login)