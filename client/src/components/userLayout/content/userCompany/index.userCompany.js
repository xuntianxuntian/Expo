import React, { Component } from 'react'
import { Typography, Spin, Divider, Form, Input, Modal, Checkbox, Button, Tooltip, Icon, message, Descriptions } from 'antd'
import store from '../../../../store'
import axios from 'axios'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import companyToUpload from '../../../../actions/companyToUpload.action'
import { UPLOAD_TO_COMPANY, COMPANY_TO_UPLOAD } from '../../../../actions/types'

// import CustomUploads from '../../../customUploads.component'
import CustomUploads from '../../../uploadPic.component'

class UserCompany extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            visible: false,
            showCompany: true,
            company: {
                cName: "",
                cAddr: "",
                cTel: "",
                taxId: "",
                bank: "",
                account: "",
                license: [],
                level: [],
            }
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "qualification"
        })
        axios.get('/api/user/companyInfo')
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
                if (res.data.company) {
                    this.setState({
                        ...this.state,
                        showCompany: false,
                        company: res.data.company,
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate(preProps) {
        if (this.state.showCompany) {

        }
    }


    // 上传控件的预览控件 Modal controller

    showModal = () => {
        this.setState({
            ...this.state,
            visible: true,
        })
    };

    // 上传控件的显示状态控制:visible
    handleOk = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            visible: false,
        });
    };

    // 上传控件的显示状态控制:invisible
    handleCancel = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            visible: false,
        });
    }

    // 公司信息填写提交按钮 Form controller
    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            isLoading: true
        })
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                axios.post('/api/user/companyInfo', { ...values })
                    .then(res => {
                        this.setState({
                            ...this.state,
                            isLoading: false
                        })
                        if (res.data.company) {
                            this.setState(
                                {
                                    ...this.state,
                                    showCompany: false,
                                    company: res.data.company
                                }
                            )
                        }
                    }).catch(err => {
                        this.setState({
                            ...this.state,
                            showCompany: true,
                            company: values,
                            isLoading: false,
                        })
                        console.log(err)
                    })
            }
        })
    }

    onUpdateCompanyInfo = (e) => {
        e.preventDefault()
        // let { cName, cAddr, taxId, account, bank, cTel } = this.state.company
        // this.props.form.setFieldsValue({ cName, cAddr, taxId, account, bank, cTel }, () => {
        //     console.log('修改信息')
        // })
        this.setState({
            ...this.state,
            showCompany: true,
        })
    }


    render() {
        const { Title, Paragraph, Text } = Typography
        const { getFieldDecorator } = this.props.form
        const { cAddr, bank, account, taxId, cName, cTel, license, level } = this.state.company
        const column = { xs: 2, sm: 2, md: 3 }


        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
        }
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
        }

        return (

            this.state.isLoading ?
                <Spin
                    style={{ marginLeft: '45%', marginTop: '20%' }}
                    tip="请求中..." size='large'>
                </Spin> :
                <div>
                    <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                        <Title level={4} >| 公司资质认证</Title>
                        <Paragraph style={{ textIndent: '8px' }}>
                            公司资质认证提供展位费用的<Text mark > 结算主体对象 </Text>及<Text mark> 发票报销 </Text>的信息内容，请用户仔细填写相关信息，并确保真实有效！
                        </Paragraph>
                    </Typography>
                    <Divider />
                    {
                        this.state.showCompany ?
                            <div style={{ height: '100%' }}>
                                <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ backgroundColor: 'white', paddingBottom: '50px', }}>
                                    <div style={{ padding: ' 0 50px' }}>
                                        <Form.Item label="公司名称">
                                            {getFieldDecorator('cName', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入单位名称!',
                                                    },
                                                ],
                                                initialValue:this.state.company.cName
                                            })(<Input />)}
                                        </Form.Item>

                                        <Form.Item label="单位地址" >
                                            {getFieldDecorator('cAddr', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入单位地址!',
                                                    },
                                                ],
                                                initialValue:this.state.company.cAddr
                                            })(<Input />)}
                                        </Form.Item>


                                        <Form.Item label="电 话" >
                                            {getFieldDecorator('cTel', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入电话!',
                                                    },
                                                ],
                                                initialValue:this.state.company.cTel
                                            })(<Input />)}
                                        </Form.Item>
                                        <Form.Item label='信用代码'>
                                            {getFieldDecorator('taxId', {
                                                rules: [{ required: true, message: '请输入单位信用代码!', whitespace: true }],
                                                initialValue:this.state.company.taxId
                                            })(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="单位银行账户">
                                            {getFieldDecorator('bank', {
                                                rules: [{ required: true, message: '请输入单位银行账户!' }],
                                                initialValue:this.state.company.bank
                                            })(<Input />)}
                                        </Form.Item>
                                        <Form.Item label="单位开户行">
                                            {getFieldDecorator('account', {
                                                rules: [{ required: true, message: '请输入单位开户行!' }],
                                                initialValue:this.state.company.account
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>

                                        <Form.Item label={
                                            <span>
                                                合法营业执照证明&nbsp;
                                        <Tooltip title="请使用*.jpg/jpeg/png格式上传">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>} >
                                            {getFieldDecorator('license', {
                                                rules: [{ required: true, message: '请上传营业执照!' }],
                                            })(
                                                <div>
                                                    <CustomUploads />
                                                </div>
                                            )}
                                        </Form.Item>

                                        <Form.Item label={<span>
                                            施工工程资质证明&nbsp;
                                            <Tooltip title="请使用*.jpg/jpeg/png格式上传">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>} >
                                            {getFieldDecorator('level', {
                                                rules: [{ required: true, message: '请上传工程资质!' }],
                                            })(
                                                <div>
                                                    <CustomUploads />
                                                </div>
                                            )}
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout}>
                                            {getFieldDecorator('agreement', {
                                                valuePropName: 'checked',
                                                rules: [{ required: true, message: '请阅读《平台使用规范及信息服务协议》!' }],
                                            })(
                                                <Checkbox value={false}>
                                                    我已阅读并同意 <a href='#' onClick={this.showModal}>《平台使用规范及信息服务协议》</a>
                                                </Checkbox>,
                                            )}
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit" onSubmit={e => this.handleSubmit(e)}>
                                                提交
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                                <Modal
                                    title="平台使用协议"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>第一条...</p>
                                    <p>第二条...</p>
                                    <p>第三条...</p>
                                </Modal>
                            </div> :
                            <div style={{ margin: '10px 50px' }}>
                                <Descriptions title={cName} column={column}>
                                    <Descriptions.Item label="地址" span={2}>{cAddr}</Descriptions.Item>
                                    <Descriptions.Item label="电话" span={1}>{cTel}</Descriptions.Item>
                                    <Descriptions.Item label="证件号" span={1}>{taxId}</Descriptions.Item>
                                    <Descriptions.Item label="银行" span={1}>{bank}</Descriptions.Item>
                                    <Descriptions.Item label="账号" span={1}>{account}</Descriptions.Item>
                                    <Descriptions.Item label="营业执照">
                                        {license}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="资质证件">
                                        {level}
                                    </Descriptions.Item>
                                </Descriptions>

                                <Button type="primary" onClick={this.onUpdateCompanyInfo}>
                                    修改信息
                                </Button>
                            </div>

                    }
                </div>
        )
    }
}
const UserCompanyForm = Form.create({})(UserCompany)

// const mapStateToProps = state => ({
//     companyFromStore: state.companyToUpload
// })

// UserCompanyForm.propTypes = {
//     companyFromStore: PropTypes.object.isRequired,
//     companyToUpload: PropTypes.func.isRequired
// }

// export default connect(mapStateToProps, { companyToUpload })(UserCompanyForm)
export default UserCompanyForm
