import { Form, Row, Col, Input, Cascader, Typography, Button } from 'antd'
import React from 'react'

import isEmpty from '../../../../../utils/isEmpty'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTempList } from '../../../../../actions/infoTemp.action'
import { switchToInfoTemp } from '../../../../../actions/changeBoothDesignTab.action'
import axios from 'axios'

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            defTemp: {},
            templateList: [],
            selectedTempId: ''
        }
    }


    componentDidMount() {
        this.props.onRef(this)
        axios.get('/api/user/template').then(
            (res) => {
                if (res.status == 200) {
                    this.setState(
                        {
                            ...this.state,
                            templateList: res.data.templateList
                        }
                    )
                    if (localStorage.getItem('default_template') && res.data.templateList.length) {
                        let defTemp = {}
                        res.data.templateList.forEach(
                            temp => {
                                if (temp.tid == localStorage.getItem('default_template')) {
                                    defTemp = temp
                                }
                            }
                        )
                        this.setState(
                            {
                                ...this.state,
                                defTemp,
                                isLoading: false
                            }
                        )
                    }

                }
            }
        )
    }
    componentDidUpdate(prevProps) {
        if (this.props.existedInfo && this.props.existedInfo !== prevProps.existedInfo) {
            const boothList = JSON.parse(localStorage.getItem('boothList'))
            if (boothList && boothList.length) {
                boothList.forEach(
                    booth => {
                        console.log(booth.bName)
                        if (booth.bName == this.props.existedInfo && booth.info) {
                            console.log('22222222222222')
                            this.onAutoSetFieldsValue(booth.info)
                        }
                    }
                )
            }
            this.setState(
                {
                    ...this.state,
                    selectedBoothId: this.props.boothToBeUpdate
                }
            )
        }
    }
    onAutoSetFieldsValue = (info) => {
        const { maxHt, maxSp, minTh, totalEp, cableTp, bmName, bmTel, emName, emTel, email } = info
        this.props.form.setFieldsValue({ maxHt, maxSp, minTh, totalEp, cableTp, bmName, bmTel, emName, emTel, email })
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
        this.setState({
            ...this.state,
            selectedTempId: value
        })
    }

    onAutoFillFormClick = (e) => {
        e.preventDefault()
        let tempToBeFilled = {}
        if (this.state.templateList.length) {
            this.state.templateList.forEach(
                (temp) => {
                    if (this.state.selectedTempId == temp.tid) {
                        tempToBeFilled = temp
                    }
                }
            )
            const { maxHt, maxSp, minTh, totalEp, cableTp, bmName, bmTel, emName, emTel, email } = tempToBeFilled
            this.onAutoSetFieldsValue({ maxHt, maxSp, minTh, totalEp, cableTp, bmName, bmTel, emName, emTel, email })
        } else {
            window.location.reload()
        }
    }

    OnSwitchToInfoTempTab = (e) => {
        e.preventDefault()
        this.props.switchToInfoTemp()
    }

    render() {
        const { templateList, isLoading } = this.state

        const { Text } = Typography
        const options = templateList.length ? templateList.map(
            temp => {
                if (temp.tid == localStorage.getItem('default_template')) {
                    return { value: temp.tid, label: '默认模板' }
                }
                return { value: temp.tid, label: temp.tempName }
            }
        ) : []
        return this.state.isLoading ? (<div>dasdasdasd</div>) :
            (<div style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', marginTop: '20px', padding: '20px 0 10px 10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text strong style={{ fontSize: '16px', paddingLeft: '15px', marginRight: '8px' }} >| 展位结构:</Text>
                    <Cascader
                        className="selectTemplateCascader"
                        options={options}
                        onChange={value => this.onTempChange(value)}
                        placeholder='选择模板'
                        disabled={this.props.formDisabled} />
                    <Button
                        size='small'
                        style={{ marginLeft: '5px' }}
                        disabled={this.props.formDisabled}
                        onClick={e => this.onAutoFillFormClick(e)}
                        type='primary'>
                        一键填写
                    </Button>
                    <span style={{ marginLeft: '10px' }}><a onClick={e => this.OnSwitchToInfoTempTab(e)}>添加模板</a></span>
                </div>
                <Form onSubmit={this.handleSearch}>

                    <Row gutter={24} style={{ padding: '10px 40px' }}>{this.getFieldsA()}</Row>
                    <Typography style={{ paddingTop: '5px', paddingLeft: '15px' }}>
                        <Text strong style={{ fontSize: '16px' }} >| 展位联系人:</Text>
                    </Typography>
                    <Row gutter={24} style={{ padding: '10px 40px' }}>{this.getFieldsB()}</Row>
                </Form>
            </div>)


    }
}

const DesignInfoForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

const mapStateToProps = state => ({
})

DesignInfoForm.propTypes = {

    switchToInfoTemp: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { switchToInfoTemp })(DesignInfoForm)