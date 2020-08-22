import { Form, Row, Col, Input, Button, Typography, message } from 'antd'
import React from 'react'
import axios from 'axios'

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: '',
            // templateToBeUpdate:{}
        }
    }
    componentDidMount() {
        this.props.onRef(false)
        console.log('asdasdasd')
    }

    componentDidUpdate(prevProps) {
        if (this.props.templateToBeUpdate &&  this.props.templateToBeUpdate !== prevProps.templateToBeUpdate) {
            this.handleSetFormValue(this.props.templateToBeUpdate)
        }
    }

    // To generate mock Form.Item
    getFields() {
        const { Text } = Typography
        const { getFieldDecorator } = this.props.form;
        const children = []
        const childrenInfo = [
            { title: '模板名称', fieldName: 'tempName' },
            { title: '展位最高点高度(单位:m)', fieldName: 'maxHt' },
            { title: '展位结构最大跨度(单位:m)', fieldName: 'maxSp' },
            { title: '展位承重墙最小厚度(单位:cm)', fieldName: 'minTh' },
            { title: '展位用电总功率(单位:kw)', fieldName: 'totalEp' },
            { title: '展位电缆规格(单位:mm²)', fieldName: 'cableTp' },
            { title: '施工负责人', fieldName: 'bmName' },
            { title: '联系电话', fieldName: 'bmTel' },
            { title: '电力负责人', fieldName: 'emName' },
            { title: '联系电话', fieldName: 'emTel' },
            { title: '联系邮箱', fieldName: 'email' },
        ]
        for (let i = 0; i < childrenInfo.length; i++) {
            children.push(

                <Form.Item label={childrenInfo[i].title} key={i} >

                    {getFieldDecorator(childrenInfo[i].fieldName, {
                        rules: [
                            {
                                required: true,
                                message: `请输入${childrenInfo[i].title}`,
                            },
                        ],
                    })(<Input />)}

                </Form.Item>

            )
        }
        return children;
    }

    handleAddTemplate = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/api/user/template', { template: { ...values } })
                    .then(
                        res => {
                            if (res.status === 200) {
                                message.success({ content: res.data.message, duration: 2, key: 'addTempSuccess' })
                                this.handleClearForm()
                                this.props.onRef(true)
                            }
                        }
                    ).catch(err => {
                        this.setState(
                            {
                                ...this.state,
                                error: err.response.data
                            }
                        )
                        message.error({ content: err.response.data, duration: 2, key: 'addTempfailed' })
                    })

            }
        })
    }

    handleSetFormValue = (template) => {
        const { tempName, maxHt, maxSp, minTh, totalEp, cableTp, bmName, bmTel, emName, emTel, email } = template
        this.props.form.setFieldsValue({ tempName, maxHt, maxSp, minTh, totalEp, cableTp, bmName, bmTel, emName, emTel, email }, () => {
            console.log('set')
        })
    }

    handleClearForm = () => {
        this.props.form.resetFields()
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }


    render() {
        const { Text } = Typography

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        }
        return (
            <div style={{ width: '100%' }}>
                <Form {...formItemLayout} onSubmit={this.handleAddTemplate}>
                    {this.getFields()}
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <span style={{ color: 'red', paddingRight: '10px' }}>{this.state.error}</span>
                            <Button type="primary" htmlType="submit">
                                添加模板
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleClearForm}>
                                清空信息
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }
}

const InfoTempForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

export default InfoTempForm