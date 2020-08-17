import { Form, Icon, Input, Button, Typography, Tooltip, Empty, Descriptions, message, Spin } from 'antd'
import React, { Component } from 'react'
import axios from 'axios'
import isEmpty from '../../../../utils/isEmpty'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToBoothList, changeToBoothList } from '../../../../actions/changeBoothList.action'
import { CHANGE_TO_BOOTHLIST } from '../../../../actions/types'


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchBoothForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOccupied: false,
            isSearching: false,
            isLoading: true,
            searchedBooth: {
                bName: '',
                bOwner: '',
                bSize: '',
                isAuthorized: 'uncommited'
            }
        }
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        console.log(this.props)


    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    ...this.state,
                    isSearching: true,
                    isLoading: true
                })
                const { bOwner, bName } = values
                let eid = localStorage.getItem('current_eid')
                if (eid) {
                    axios.post(`/api/user/queryBoothInExpo/${eid}`, { bOwner, bName })
                        .then(res => {
                            if (res.data.booth) {
                                const b = res.data.booth
                                let isAuthorized = 'uncommited'
                                if (b.auth && b.auth.company && b.auth.company.status) {
                                    isAuthorized = b.auth.company.status
                                }
                                if (this.props.boothList.length) {
                                    this.props.boothList.forEach(booth => {
                                        if (booth.bid == b.bid) {
                                            this.setState({
                                                ...this.state,
                                                isOccupied: true,
                                            })
                                        }
                                    })
                                }
                                this.setState({
                                    ...this.state,
                                    isLoading: false,
                                    searchedBooth: {
                                        bName: b.bName.fullName,
                                        bOwner: b.bOwner,
                                        bSize: b.bSize,
                                        isAuthorized
                                    },
                                })
                            }else{
                                this.setState({
                                    ...this.state,
                                    isLoading: false,
                                })
                            }

                        })
                        .catch(err => {
                            this.setState({
                                ...this.state,
                                isLoading: false,
                            })
                            console.log(err)
                        })
                }
            }
        })
    }

    addBooth = (e) => {
        e.preventDefault()
        console.log()
        if (this.props.boothList.length) {
            for (let i = 0; i < this.props.boothList.length; i++) {
                console.log(this.props.boothList[i])
                if (this.props.boothList[i].boothId === this.state.searchedBooth.boothId) {
                    message.error('该展位已添加，请勿重复添加!')
                    break;
                } else {
                    axios.post('/api/booth/save', { booth: this.state.searchedBooth })
                        .then(res => {
                            if (res.data.isOccupied) {
                                this.setState({
                                    ...this.state,
                                    isOccupied: true
                                })
                            } else if (res.data.error) {
                                message.error(res.data.error)
                            } else {
                                message.success('添加成功，请认证您添加的展位!')
                                const appendKey = this.state.searchedBooth
                                appendKey['key'] = this.props.boothList.length
                                this.props.addToBoothList(appendKey)
                                let localBoothList = JSON.parse(localStorage.boothList)
                                localBoothList.push(appendKey)
                                localStorage.setItem('boothList', JSON.stringify(localBoothList))

                            }
                        })
                }
            }
        } else {
            axios.post('/api/booth/save', { booth: this.state.searchedBooth })
                .then(res => {
                    if (res.data.isOccupied) {
                        this.setState({
                            ...this.state,
                            isOccupied: true
                        })
                    } else if (res.data.error) {
                        message.error(res.data.error)
                    } else {
                        message.success('添加成功，请认证您添加的展位!')
                        const appendKey = this.state.searchedBooth
                        appendKey['key'] = this.props.boothList.length
                        this.props.addToBoothList(appendKey)
                    }
                }).catch(err => console.log(err))
        }

    }

    render() {
        const { Text } = Typography
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        let btnText = '添加展位'
        const { isAuthorized, isOccupied, searchedBooth, isLoading, isSearching } = this.state
        if (isOccupied) {
            btnText = '已添加'
        } else if (isAuthorized !== 'uncommited' && !isOccupied) {
            btnText = '已被其他用户锁定'
        }

        // Only show error after a field is touched.
        const bNameError = isFieldTouched('bName') && getFieldError('bName');
        const bOwnerError = isFieldTouched('bOwner') && getFieldError('bOwner');
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={bNameError ? 'error' : ''} help={bNameError || ''}>
                        {getFieldDecorator('bName', {
                            rules: [{ required: true, message: '请按照规则输入展位号!' }],
                        })(
                            <Input
                                addonBefore='展位号:'
                                addonAfter={<Tooltip title=" 展位号中请去掉`-\()/*%$_`等一些特殊符号，忽略大小写。">
                                    <Icon type="info-circle-o" />
                                </Tooltip>}
                                prefix={<Icon type="sort-ascending" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入展位号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={bOwnerError ? 'error' : ''} help={bOwnerError || ''}>
                        {getFieldDecorator('bOwner', {
                            rules: [{ required: true, message: '请按照规则输入正确信息!' }],
                        })(
                            <Input
                                addonBefore='展位名称:'
                                addonAfter={<Tooltip title=" 展位名称关键字，不包含‘公司’、‘集团’等一致性文字">
                                    <Icon type="info-circle-o" />
                                </Tooltip>}
                                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入包含的关键字"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ margin: '20px 20px' }}>
                    {!isSearching ?
                        <div style={{ height: '120px' }}>
                            <Text type='secondary' style={{ margin: '80px 30% ', fontSize: '18px', fontWeight: 'bold' }}><Icon type="edit" />请输入搜索信息，查找并添加您的展位...</Text>
                        </div>
                        :
                        isLoading ?
                            <div style={{ width: '100%', height: '100%' }}>
                                <Spin
                                    style={{ margin: ' 49px 45% 48px 45%' }}
                                    tip="数据加载中..." size='large'>
                                </Spin>
                            </div>
                            :
                            searchedBooth.bName ?
                                <div>
                                    <Descriptions title="展位信息" column={2}>
                                        <Descriptions.Item label="展位号">{searchedBooth.bName}</Descriptions.Item>
                                        <Descriptions.Item label="展商名称">{searchedBooth.bName}</Descriptions.Item>
                                        <Descriptions.Item label="展位面积">{searchedBooth.bSize} ㎡</Descriptions.Item>
                                        <Descriptions.Item label="其他">empty</Descriptions.Item>
                                    </Descriptions>
                                    <Button style={{ marginLeft: '80%' }} onClick={e => this.addBooth(e)} disabled={isOccupied || isAuthorized ? true : false}>
                                        <Icon type={isOccupied || isAuthorized ? 'stop' : 'plus'} />
                                        {btnText}
                                    </Button>
                                </div> :
                                <Empty
                                    style={{}}
                                    description={<span >
                                        <Text type='secondary' strong>未查询到相应的展位！</Text>
                                        <br /><Text type='secondary'>请重新输入正确的信息，或者联系工作人员:027-8531 5811</Text>
                                    </span>}
                                />
                    }
                </div>

            </div>

        );
    }
}

const SearchBooth = Form.create({ name: 'horizontal_login' })(SearchBoothForm)


const mapStateToProps = state => ({
    boothList: state.boothList
})

SearchBooth.propTypes = {
    boothList: PropTypes.array.isRequired,
    addToBoothList: PropTypes.func.isRequired,
    changeToBoothList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addToBoothList, changeToBoothList })(SearchBooth)