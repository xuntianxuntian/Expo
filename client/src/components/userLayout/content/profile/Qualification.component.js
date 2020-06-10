import React, { Component } from 'react'
import { Typography, Spin, Divider, Form, Input, Modal, Checkbox, Button, Tooltip, Icon, message } from 'antd'
import store from '../../../../store'
// import isEmpty from '../../../../utils/isEmpty'
import axios from 'axios'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import companyToUpload from '../../../../actions/companyToUpload.action'
import { UPLOAD_TO_COMPANY, COMPANY_TO_UPLOAD } from '../../../../actions/types'

import CustomUploads from '../../../customUploads.component'
import QualifiedList from './QualifiedList.component'

class Qualification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            visible: false,
            startUploading: false,
            showCompany: true,
            company: {
                name: "",
                addr: "",
                tel: "",
                taxId: "",
                bank: "",
                account: "",
                license: [],
                level: [],
                auth: {
                    //auth license
                    li: false,
                    //auth level
                    le: false,
                    //auth error message
                    err: {
                        li: '',
                        le: ''
                    }
                }
            }
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "qualification"
        })
        axios.get('/api/user/company')
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false
                })
                if (res.status == 200) {
                    const {name,addr,tel,bank,taxId,license,level,auth,account} =res.data
                    this.setState({
                        ...this.state,
                        showCompany: true,
                        company: {name,addr,tel,bank,taxId,license,level,auth,account},
                    })
                } else if(res.status == 202 ){
                    this.props.companyToUpload(COMPANY_TO_UPLOAD,{})
                }

            }).catch(err => {
                if (err.response.status == 404) {
                    message.error('请先上传公司信息!')
                    this.props.companyToUpload(COMPANY_TO_UPLOAD, {})
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        showCompany: false
                    })
                } else {
                    message.error('请求发生错误!请联系管理员')
                    this.props.companyToUpload(COMPANY_TO_UPLOAD, {})
                    this.setState({
                        ...this.state,
                        isLoading: false
                    })
                }
            })
            console.log(this.state.company)
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
        console.log(e);
        this.setState({
            ...this.state,
            visible: false,
        });
    };

    // 上传控件的显示状态控制:invisible
    handleCancel = e => {
        console.log('failed', e);
        this.setState({
            ...this.state,
            visible: false,
        });
    }

    // 公司信息填写提交按钮 Form controller
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err && this.props.form.getFieldValue('agreement')) {
                console.log('Received values of form: ', values)
                this.setState({
                    ...this.state,
                    startUploading: true
                })
                console.log(values)
                axios.post('/api/user/company', { formData: values })
                    .then(res => {
                        console.log(res.data)
                        this.props.companyToUpload(UPLOAD_TO_COMPANY, res.data)
                        this.setState({
                            isLoading: false
                        })
                        if (res.data.name) {
                            const {name,addr,tel,bank,taxId,license,level,auth,account} =res.data
                            this.setState({
                                ...this.state,
                                company: {name,addr,tel,bank,taxId,license,level,auth,account},
                                showCompany: true,
                            })
                        }
                    }).catch(err => {
                        message.error('err')
                        console.log(err)
                    })
            } else if (!this.props.form.getFieldValue('agreement')) {
                message.error('请阅读并同意《平台使用规范及信息服务协议》')
            } else {
                message.error('请完整表格信息!')
            }
        })
    }


    render() {
        const { Title, Paragraph, Text } = Typography
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 8 },
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
                    tip="数据加载中..." size='large'>
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
                        this.props.companyFromStore.to ?
                            <div style={{ height: '100%' }}>
                                <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ backgroundColor: 'white', paddingBottom: '50px' }}>
                                    <Form.Item label="单位名称">
                                        {getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入单位名称!',
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="单位地址" >
                                        {getFieldDecorator('addr', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入单位地址!',
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="电 话" >
                                        {getFieldDecorator('tel', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入电话!',
                                                },
                                            ],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label='信用代码'>
                                        {getFieldDecorator('taxId', {
                                            rules: [{ required: true, message: '请输入单位信用代码!', whitespace: true }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="单位银行账户">
                                        {getFieldDecorator('bank', {
                                            rules: [{ required: true, message: '请输入单位银行账户!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="单位开户行">
                                        {getFieldDecorator('account', {
                                            rules: [{ required: true, message: '请输入单位开户行!' }],
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
                                            valuePropName: 'filelist',
                                        })(
                                            <div>
                                                <CustomUploads
                                                    style={{ display: 'inline-block' }}
                                                    startUploading={this.state.startUploading}
                                                    uploadUrl='api/uploads/qualification'
                                                    fileName='license'
                                                    previewStyle='picture'
                                                    previewClassName='upload-list-inline-qualification'
                                                />
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
                                            valuePropName: 'filelist'
                                        })(
                                            <div>
                                                <Tooltip title="最多可同时上传3个文件" placement="right">
                                                    <div>
                                                        <CustomUploads
                                                            style={{ display: 'inline-block' }}
                                                            startUploading={this.state.startUploading}
                                                            uploadUrl='api/uploads/qualification'
                                                            fileName='level'
                                                            previewStyle='picture'
                                                            previewClassName='upload-list-inline-qualification'
                                                            isMultiple={true}
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        )}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        {getFieldDecorator('agreement', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>
                                                我已阅读并同意 <a href='#' onClick={this.showModal}>《平台使用规范及信息服务协议》</a>
                                            </Checkbox>,
                                        )}
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" onSubmit={e => this.handleSubmit(e)}>
                                            提交
                        </Button>
                                    </Form.Item>
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
                            <QualifiedList
                                company={this.state.company}
                            />
                    }
                </div>
        )
    }
}
const WrappedQualificationForm = Form.create({})(Qualification)

const mapStateToProps = state => ({
    companyFromStore: state.companyToUpload
})

WrappedQualificationForm.propTypes = {
    companyFromStore: PropTypes.object.isRequired,
    companyToUpload: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { companyToUpload })(WrappedQualificationForm)
