import React from 'react'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, Spin,Result } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import registerUser from '../../../actions/register/register.action'
import registerToLogin from '../../../actions/register/registerToLogin.action'
import PropTypes from 'prop-types'
import '../../../css/auth/register.component.css'

const { Option } = Select;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        error: {},
        isFetching: false,
        registerDone: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            isFetching: true
        })
        const { email, password, password2, tel, username, company, captcha } = this.props.form.getFieldsValue()
        await this.props.registerUser({ email, password, password2, tel, username, company, captcha }, this.props.history)
        this.setState({
            ...this.state,
            isFetching: this.props.register.success,
            registerDone: this.props.register.success
        })
    }

    changeTab = (e)=>{
        this.props.registerToLogin('1')
    }

    async componentWillReceiveProps(nextProp) {
        const error = nextProp.register.error
        await this.setState({
            error
        })
    }

    // compareToFirstPassword = (rule, value, callback) => {
    //     const { form } = this.props;
    //     if (value && value !== form.getFieldValue('password')) {
    //         callback('Two passwords that you enter is inconsistent!');
    //     } else {
    //         callback();
    //     }
    // }

    // validateToNextPassword = (rule, value, callback) => {
    //     const { form } = this.props;
    //     if (value && this.state.confirmDirty) {
    //         form.validateFields(['confirm'], { force: true });
    //     }
    //     callback();
    // }


    render() {
        const { getFieldDecorator } = this.props.form;
        const spinIcon = <Icon type={this.state.registerDone ? "check" : "loading"} style={{ fontSize: 24 }} />

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );



        return (this.state.registerDone ? (
            <Result
                status="success"
                title = {'注册成功！欢迎 '+this.props.register.user.email}
                subTitle=""
                extra={[
                    <Button type="primary" key="console" onClick={this.changeTab}>
                        马上登录
                    </Button>
                    
                ]}
            />
        ) : (<Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="邮箱"
                extra={this.state.error.email ? this.state.error.email : ''}
                validateStatus={this.props.register.error.email ? 'error' : ''}
            >
                {getFieldDecorator('email', {
                    rules: [
                        // {
                        //     type: 'email',
                        //     message: '请输入正确的邮箱',
                        // },
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                    ],
                })(<Input />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback
                extra={this.state.error.password ? this.state.error.password : ''}
                validateStatus={this.props.register.error.password ? 'error' : ''}
            >
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: '请输入密码',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                    ],
                })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback
                extra={this.state.error.password2 ? this.state.error.password2 : ''}
                validateStatus={this.props.register.error.password2 ? 'error' : ''}
            >
                {getFieldDecorator('password2', {
                    rules: [
                        {
                            required: true,
                            message: '请输入确认密码',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                    ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
                label={
                    <span>
                        公司名称&nbsp;
                                <Tooltip title="场馆服务商/搭建商/参展商 ：公司名称">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                }
                extra={this.state.error.company ? this.state.error.company : ''}
                validateStatus={this.props.register.error.company ? 'error' : ''}
            >
                {getFieldDecorator('company', {
                    rules: [{ required: true, message: '请输入公司全称', whitespace: true }],
                })(<Input />)}
            </Form.Item>
            <Form.Item label="手机"
                extra={this.state.error.tel ? this.state.error.tel : ''}
                validateStatus={this.props.register.error.tel ? 'error' : ''}
            >
                {getFieldDecorator('tel', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="验证码"
                extra={this.state.error.captcha ? this.state.error.captcha : ''}
                validateStatus={this.props.register.error.captcha ? 'error' : ''}
            >
                <Row gutter={8}>
                    <Col span={12}>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                        })(<Input />)}
                    </Col>
                    <Col span={12}>
                        <Button>发送验证码</Button>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                })(
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>,
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit"     className="register-form-button">
                    注册
                        </Button>
                {this.state.isFetching ? <Spin indicator={spinIcon} size="large" /> : ''}
            </Form.Item>
        </Form>)



        );
    }
}

const mapStateToProps = state => ({
    register: state.register,
    toLogin:state.toLogin
})

const RegisterForm = Form.create({ name: 'register' })(RegistrationForm);

RegisterForm.propTypes = {
    register: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    toLogin: PropTypes.object.isRequired,
    registerToLogin: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, { registerUser,registerToLogin })(withRouter(RegisterForm))