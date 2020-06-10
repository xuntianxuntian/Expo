import { Form, Icon, Input, Button, Typography, Tooltip, Empty, Descriptions, message, Spin } from 'antd'
import React, { Component } from 'react'
import axios from 'axios'
import isEmpty from '../../../../utils/isEmpty'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToBoothList ,changeToBoothList } from '../../../../actions/changeBoothList.action'
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
            searchError: {
                boothId: '',
                boothName: ''
            },

            searchedBooth: {
                boothId: '',
                boothName: '',
                boothSize: '',
                isAuthorized: {

                }
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
                const { boothId, boothName } = values
                axios.get('/api/booth/search', { params: { boothId, boothName, cid: localStorage.currentExpoCID } })
                    .then(res => {
                        if (res.data.error) {
                            this.setState({
                                ...this.state,
                                isLoading: false,
                                searchError: res.data.error
                            })
                        } else {
                            this.setState({
                                ...this.state,
                                isLoading: false,
                                searchedBooth: res.data,
                                searchError: {
                                    boothId: '',
                                    boothName: ''
                                }
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({
                            ...this.state,
                            searchError: { boothId: err.response.data }
                        })
                    })
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
                                localStorage.setItem('boothList',JSON.stringify(localBoothList))

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
        const { Text, Title, Paragraph } = Typography
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const boothIdError = isFieldTouched('boothId') && getFieldError('boothId');
        const boothNameError = isFieldTouched('boothName') && getFieldError('boothName');
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={boothIdError ? 'error' : ''} help={boothIdError || ''}>
                        {getFieldDecorator('boothId', {
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
                    <Form.Item validateStatus={boothNameError ? 'error' : ''} help={boothNameError || ''}>
                        {getFieldDecorator('boothName', {
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
                    {!this.state.isSearching ?
                        <div style={{ height: '120px' }}>
                            <Text type='secondary'  style={{ margin: '80px 30% ' ,fontSize:'18px',fontWeight:'bold'}}><Icon type="edit" />请输入搜索信息，查找并添加您的展位...</Text>
                        </div>
                        :
                        this.state.isLoading ?
                            <div style={{ width: '100%', height: '100%' }}>
                                <Spin
                                    style={{ margin: ' 49px 45% 48px 45%' }}
                                    tip="数据加载中..." size='large'>
                                </Spin>
                            </div>
                            :
                            isEmpty(this.state.searchError.boothId) && isEmpty(this.state.searchError.boothName) ?
                                <div>
                                    <Descriptions title="展位信息" column={2}>
                                        <Descriptions.Item label="展位号">{this.state.searchedBooth.boothId}</Descriptions.Item>
                                        <Descriptions.Item label="展商名称">{this.state.searchedBooth.boothName}</Descriptions.Item>
                                        <Descriptions.Item label="展位面积">{this.state.searchedBooth.boothSize} ㎡</Descriptions.Item>
                                        <Descriptions.Item label="其他">empty</Descriptions.Item>
                                    </Descriptions>
                                    <Button style={{ marginLeft: '80%' }} onClick={e => this.addBooth(e)}><Icon type="plus" />添加展位</Button>
                                </div> :
                                <Empty
                                    style={{}}
                                    description={<span >
                                        <Text type='secondary' style={{ fontSize: '20px', fontWeight: 'bold' }}>{this.state.searchError.boothId || this.state.searchError.boothName}</Text >
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

export default connect(mapStateToProps, { addToBoothList,changeToBoothList })(SearchBooth)