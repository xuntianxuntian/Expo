import { Form, Row, Col, Input, Cascader, Typography, Button } from 'antd'
import React from 'react'

import isEmpty from '../../../../../utils/isEmpty'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getInfoTempList } from '../../../../../actions/infoTemp.action'
import {switchToInfoTemp } from '../../../../../actions/changeBoothDesignTab.action'

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            defaultTempValue: {
                maxHt: '',
                maxSp: '',
                minTh: '',
                totalEp: '',
                cableTp: '',
                bmName: '',
                bmTel: '',
                emName: '',
                emTel: '',
                email: '',
            }
        }
    }


    componentDidMount() {
        this.props.onRef(this)
        this.props.getInfoTempList().then(
            infoTempList => {
                infoTempList.forEach(
                    infoTemp => {
                        const {maxHt,maxSp,minTh,totalEp,cableTp,bmName,bmTel,emName,emTel,email} = infoTemp
                        if (infoTemp.isDefault) {
                            this.setState({
                                ...this.state,
                                defaultTempValue: {maxHt,maxSp,minTh,totalEp,cableTp,bmName,bmTel,emName,emTel,email}
                            })
                        }
                    }
                )
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
            }
        )
    }


    // To generate mock Form.Item
    getFieldsA() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        const childrenInfo = [
            { title: '展位最高点高度(单位:m)', fieldName: 'maxHt' },
            { title: '展位结构最大跨度(单位:m)', fieldName: 'maxSp' },
            { title: '展位承重墙最小厚度(单位:cm)', fieldName: 'minTh' },
            { title: '展位用电总功率(单位:kw)', fieldName: 'totalEp' },
            { title: '展位电缆规格(单位:mm²)', fieldName: 'cableTp' },
        ]
        for (let i = 0; i < childrenInfo.length; i++) {
            children.push(
                <Col span={4} key={i}>
                    <Form.Item label={childrenInfo[i].title}>
                        {getFieldDecorator(childrenInfo[i].fieldName, {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入正确信息',
                                },
                            ],
                        })(<Input disabled={this.props.formDisabled} />)}
                    </Form.Item>
                </Col>
            );
        }
        return children;
    }

    getFieldsB() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        const childrenInfo = [
            { title: '施工负责人', fieldName: 'bmName' },
            { title: '联系电话', fieldName: 'bmTel' },
            { title: '电力负责人', fieldName: 'emName' },
            { title: '联系电话', fieldName: 'emTel' },
            { title: '联系邮箱', fieldName: 'email' },
        ]
        for (let i = 0; i < childrenInfo.length; i++) {
            children.push(
                <Col span={4} key={i + 5} >
                    <Form.Item label={childrenInfo[i].title}>
                        {getFieldDecorator(childrenInfo[i].fieldName, {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入正确信息',
                                },
                            ],
                        })(<Input disabled={this.props.formDisabled} />)}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }



    handleReset = () => {
        this.props.form.resetFields();
    }



    onTempChange = value => {
        console.log(value)
        if (!isEmpty(value)) {
            return this.setState({
                ...this.state,
                uploadDisabled: false
            })
        }
        return this.setState({
            ...this.state,
            uploadDisabled: true
        })
    }

    onDefaultTempButtonClick = (e) => {
        e.preventDefault()
        this.props.form.setFieldsValue(this.state.defaultTempValue, () => console.log('SetFormValue callback'))
    }

    OnSwitchToInfoTempTab = (e) => {
        e.preventDefault()
        this.props.switchToInfoTemp()
    }

    render() {

        const { Text } = Typography
        const options = [{
            value: 'sssss',
            label: 'sssss'
        }]

        return (
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', marginTop: '20px', padding: '20px 0 10px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button disabled={this.props.formDisabled} onClick={e => this.onDefaultTempButtonClick(e)} >使用默认模板填写</Button>&nbsp;&nbsp;或&nbsp;&nbsp;
                    <Cascader options={options} onChange={value => this.onTempChange(value)} placeholder='用其他模板填写' disabled={this.props.formDisabled} />
                    <span style={{ marginLeft: '10px' }}>没有模板?<a onClick = {e => this.OnSwitchToInfoTempTab(e)}>去添加</a></span>
                </div>
                <Form onSubmit={this.handleSearch}>
                    <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                        <Text strong style={{ fontSize: '16px' }} >| 展位结构:
                        </Text>
                    </Typography>
                    <Row gutter={24} style={{ padding: '10px 40px' }}>{this.getFieldsA()}</Row>
                    <Typography style={{ paddingTop: '5px', paddingLeft: '15px' }}>
                        <Text strong style={{ fontSize: '16px' }} >| 展位联系人:</Text>
                    </Typography>
                    <Row gutter={24} style={{ padding: '10px 40px' }}>{this.getFieldsB()}</Row>
                </Form>
            </div>

        )
    }
}

const DesignInfoForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

const mapStateToProps = state => ({
    infoTempList: state.infoTempList
})

DesignInfoForm.propTypes = {
    infoTempList: PropTypes.array.isRequired,
    getInfoTempList: PropTypes.func.isRequired,
    switchToInfoTemp: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { switchToInfoTemp ,getInfoTempList})(DesignInfoForm)