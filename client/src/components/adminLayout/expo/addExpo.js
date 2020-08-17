import React, { useState, useEffect } from 'react'
import store from '../../../store'
import { Form, Row, Col, Input, Divider, Typography, Button } from 'antd'
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

class formComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autoComplete: false,
            formData: {
                Internet2mFee: '',
                Internet2mFee2: '',
                Internet5mFee: '',
                Internet5mFee2: '',
                Internet10mFee: '',
                Internet10mFee2: '',
                Internet20mFee: '',
                Internet20mFee2: '',
                Internet30mFee: '',
                Internet30mFee2: '',
                Internet50mFee: '',
                Internet50mFee2: '',
                Internet100mFee: '',
                Internet100mFee2: '',
                waterFee: '',
                waterFee2: '',
                SG2205Fee: '',
                SG2205Fee2: '',
                SG22010Fee: '',
                SG22010Fee2: '',
                SG22015Fee: '',
                SG22015Fee2: '',
                ZQ22015Fee: '',
                ZQ22015Fee2: '',
                ZQ38015Fee: '',
                ZQ38015Fee2: '',
                ZQ38020Fee: '',
                ZQ38020Fee2: '',
                ZQ38030Fee: '',
                ZQ38030Fee2: '',
                ZQ38060Fee: '',
                ZQ38060Fee2: '',
                ZQ380100Fee: '',
                ZQ380100Fee2: '',
                ZQ380150Fee: '',
                ZQ380150Fee2: '',
                certificateFee: '',
                certificateFee2: '',
                cleanUpFee: '',
                cleanUpFee2: '',
                closeTime: '',
                createdBy: '',
                depositFee: '',
                depositFee2: '',
                desc: '',
                expoName: '',
                expoUrl: '',
                extinguisherFee: '',
                extinguisherFee2: '',
                hostBy: '',
                managementFee: '',
                managementFee2: '',
                openTime: '',
            }
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "addExpo"
        })
        if (this.state.autoComplete) {
            this.props.form.setFieldsValue(this.state.formData, () => console.log('added!'))
        }

        console.log(this.props.formData)
    }

    componentDidUpdate(prevProps) {
        if (this.props.formInfo && this.props.formInfo.cid && this.props.formInfo.cid !== prevProps.formInfo.cid) {
            console.log('sss')

            let {cid,...formData} = this.props.formInfo
            this.setState({
                ...this.state,
                autoComplete:true,
                formData
            })
            this.props.form.setFieldsValue(formData, () => console.log('added!'))
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
            console.log(err)
        })
    }


    render() {

        const { Title, Paragraph, Text } = Typography
        const { getFieldDecorator } = this.props.form
        const { TextArea } = Input
        //基本信息的表单内容生成
        const formSetting1 = [
            { label: '展会名称', decoratorName: 'expoName', required: true, },
            { label: '展会官网', decoratorName: 'expoUrl', required: false, },
            { label: '开展时间', decoratorName: 'openTime', required: true, },
            { label: '闭展时间', decoratorName: 'closeTime', required: true, },
            { label: '主场服务单位', decoratorName: 'hostBy', required: true, },
            { label: '主办单位', decoratorName: 'createdBy', required: true, },
            { label: '展会简介', decoratorName: 'desc', required: true, },
        ]
        const FormSource1 = formSetting1.slice(0, 3).map(item => {
            return (
                <Col span={8} key={item.label}>
                    <Form.Item label={item.label} key={item.label}>
                        {getFieldDecorator(item.decoratorName, {
                            rules: [{ required: item.required, message: `请输入${item.label}` }],
                        })(
                            <Input
                                // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={item.label}
                            />,
                        )}
                    </Form.Item>
                </Col>
            )
        })
        const FormSource2 = formSetting1.slice(3, 6).map(item => {
            return (
                <Col span={8} key={item.label}>
                    <Form.Item label={item.label} key={item.label}>
                        {getFieldDecorator(item.decoratorName, {
                            rules: [{ required: item.required, message: `请输入${item.label}` }],
                        })(
                            <Input
                                // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={item.label}
                            />,
                        )}
                    </Form.Item>
                </Col>
            )
        })


        //费用设置的  基本费用表单内容
        const formSetting2 = [
            { label: "特装管理费(元/㎡)", decoratorName: 'managementFee' },//基本费用
            { label: "施工保证金(元)", decoratorName: 'depositFee' },
            { label: "施工证件费(元/个)", decoratorName: 'certificateFee' },
            { label: "垃圾清运费(元/㎡)", decoratorName: 'cleanUpFee' },
            { label: "灭火器租赁费(元/个)", decoratorName: 'extinguisherFee' },
            { label: "220V/5A", decoratorName: 'SG2205Fee' },//施工电费
            { label: "220V/10A", decoratorName: 'SG22010Fee' },
            { label: "220V/15A", decoratorName: 'SG22015Fee' },
            { label: "220V/15A", decoratorName: 'ZQ22015Fee' },//展期电费
            { label: "380V/15A", decoratorName: 'ZQ38015Fee' },
            { label: "380V/20A", decoratorName: 'ZQ38020Fee' },
            { label: "380V/30A", decoratorName: 'ZQ38030Fee' },
            { label: "380V/60A", decoratorName: 'ZQ38060Fee' },
            { label: "380V/100A", decoratorName: 'ZQ380100Fee' },
            { label: "380V/150A", decoratorName: 'ZQ380150Fee' },
            { label: "2M", decoratorName: 'Internet2mFee' },//宽带使用费
            { label: "5M", decoratorName: 'Internet5mFee' },
            { label: "10M", decoratorName: 'Internet10mFee' },
            { label: "20M", decoratorName: 'Internet20mFee' },
            { label: "30M", decoratorName: 'Internet30mFee' },
            { label: "50M", decoratorName: 'Internet50mFee' },
            { label: "100M", decoratorName: 'Internet100mFee' },
            { label: "10元/㎡", decoratorName: 'waterFee' },//水费

        ]
        const baseFeeForm = formSetting2.slice(0, 5).map(item => {
            return (< Row key={item.label}>
                <Col>
                    <Form.Item label="特装管理费(元/㎡)" >
                        {getFieldDecorator(item.decoratorName, {
                            rules: [{ required: true, message: `请输入${item.label}!` }],
                        })(
                            <Input
                                // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={item.label}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="非指定">
                        {getFieldDecorator(`${item.decoratorName}2`, {
                            rules: [{ required: true, message: `请输入${item.label}!` }],
                        })(
                            <Input
                                // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder={item.label}
                            />,
                        )}
                    </Form.Item>
                </Col>
            </Row >)
        })

        const elecSGFee = formSetting2.slice(5, 8).map(item => {
            return (
                <Row key={item.label}>
                    <Col offset={1}>
                        <Form.Item label={item.label}>
                            {getFieldDecorator(item.decoratorName, {
                                rules: [{ required: true, message: '请输入费用规格!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={item.label}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="非指定">
                            {getFieldDecorator(`${item.decoratorName}2`, {
                                rules: [{ required: true, message: '请输入费用规格!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={item.label}
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            )
        })

        const elecFee = formSetting2.slice(8, 15).map(item => {
            return (
                <Row key={item.label}>
                    <Col offset={1}>
                        <Form.Item label={item.label}>
                            {getFieldDecorator(item.decoratorName, {
                                rules: [{ required: true, message: '请输入费用规格!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={item.label}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="非指定">
                            {getFieldDecorator(`${item.decoratorName}2`, {
                                rules: [{ required: true, message: '请输入费用规格!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={item.label}
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            )
        })

        const internetFee = formSetting2.slice(15).map(item => {
            return (
                <Row key={item.label}>
                    <Col offset={1}>
                        <Form.Item label={item.label}>
                            {getFieldDecorator(item.decoratorName, {
                                rules: [{ required: true, message: '请输入费用规格!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={item.label}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="非指定">
                            {getFieldDecorator(`${item.decoratorName}2`, {
                                rules: [{ required: true, message: '请输入费用规格!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder={item.label}
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            )
        })




        return (
            <div style={{ backgroundColor: 'white' }}>
                {this.props.formInfo ? '' :
                    <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                        <Title level={4} >| 添加展会</Title>
                        <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                            请根据表格填写相应的信息，以确保展会信息的<Text mark > 正常收集和审核 </Text>。
                        </Paragraph>
                    </Typography>
                }

                <Form layout="inline" labelAlign='left'>
                    <div style={{ padding: '0 20px', }}>
                        <Divider><Title level={4}>基本信息</Title></Divider>
                        <Row gutter={[24, 6]}>
                            {FormSource1}
                        </Row>
                        <Row gutter={[24, 6]}>
                            {FormSource2}

                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="展会简介" >
                                    {getFieldDecorator('desc', {
                                        rules: [{ required: true, message: '请输入展会简介!' }],
                                    })(
                                        <TextArea
                                            // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="展会简介"

                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* </Form> */}
                    </div>
                    <div style={{ padding: '12px 20px' }}>
                        <Divider><Title level={4}>费用设置</Title></Divider>
                        {/* <Form layout="inline" labelAlign='left'> */}
                        {baseFeeForm}

                        <Row>
                            <Col>电力使用费(施工期)</Col>
                        </Row>
                        {elecSGFee}
                        <Row>
                            <Col>电力使用费(展期)</Col>
                        </Row>
                        {elecFee}
                        <Row>
                            <Col>宽带使用费(元/天)</Col>
                        </Row>
                        {internetFee}
                        <Form.Item >
                            <Button type="primary" htmlType="submit" onClick={this.onFormSubmit}>
                                提交
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        )

    }
}

export const AddExpo = Form.create({ name: 'AddExpo' })(formComponent)