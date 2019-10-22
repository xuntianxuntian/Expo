import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import bg_02 from '../../bg_02.jpg'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ backgroundImage: `url(${bg_02})`, width: "100%", position: "fixed", top: 0, bottom: 0, left: 0, right: 0, height: "100%", backgroundAttachment: "fixed" }}>
        <div style={{ height: "100%", width: "500px", float: "right", backgroundColor: "white", padding: "150px 50px" }}>
          <Form onSubmit={this.handleSubmit} className="login-form" >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
          </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Login
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>

    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login