import React, { Component } from 'react'
import { Form, Icon, Input, Button, Typography, } from 'antd';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {commitInfo,commitError} from '../../../../../actions/DesignUploads/commitInfo.action'



class HorizontalLoginForm extends Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        // this.props.form.validateFields()
        this.props.onRef(this)
        console.log(this.props)
        if(this.props.submitInfo){
            this.props.form.validateFields((err, values) => {
                if(err){
                    console.log(err)
                    this.props.commitError(err)
                }
                else {
                    this.props.commitInfo(values)
                }
            })
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.child)
        this.props.form.validateFields((err, values) => {
            if(err){
                console.log(err)
                this.props.commitError(err)
            }
            else {
                this.props.commitInfo(values)
            }
        })
    }
    // hasErrors(fieldsError) {
    //     return Object.keys(fieldsError).some(field => fieldsError[field])
    // }

    render() {
        const { Text } = Typography
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const user1Error = isFieldTouched('user1') && getFieldError('user1')
        const user2Error = isFieldTouched('user2') && getFieldError('user2')
        const user3Error = isFieldTouched('user3') && getFieldError('user3')
        const user4Error = isFieldTouched('user4') && getFieldError('user4')
        
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={user1Error ? 'error' : ''} help={user1Error || ''}>
                    {getFieldDecorator('user1', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            disabled={this.props.disabled}
                            addonBefore={<Text strong>展位联系人:</Text>}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="姓名"
                            style={{ display: 'inline-block' }}
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={user2Error ? 'error' : ''} help={user2Error || ''}>
                    {getFieldDecorator('user2', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            disabled={this.props.disabled}
                            addonBefore={<Text strong>展位安全负责人:</Text>}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="姓名"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={user3Error ? 'error' : ''} help={user3Error || ''}>
                    {getFieldDecorator('user3', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            disabled={this.props.disabled}
                            addonBefore={<Text strong>展位安全负责人:</Text>}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="姓名"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={user4Error ? 'error' : ''} help={user4Error || ''}>
                    {getFieldDecorator('user4', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            disabled={this.props.disabled}
                            addonBefore={<Text strong>联系电话:</Text>}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="电话"
                        />,
                    )}
                </Form.Item>
                <Button onClick = {this.handleSubmit}>{this.props.submitInfo?'sss':'ssssssss'}</Button>
            </Form>
        );
    }
}

const CommonInfoForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

const mapStateToProps = state => ({
})

CommonInfoForm.propTypes = {
    commitError: PropTypes.func.isRequired,
    commitInfo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { commitError, commitInfo })(CommonInfoForm)