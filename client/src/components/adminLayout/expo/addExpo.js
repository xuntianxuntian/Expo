import React, { useState, useEffect } from 'react'
import store from '../../../store'
import { Form, Icon, Input, Button, Typography } from 'antd'

const formComponent = (props) => {

    const { Title, Paragraph, Text } = Typography
    const { getFieldDecorator} = props.form;

    useEffect(() => {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "addExpo"
        })
    })

    return (
        <div>
            <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                <Title level={4} >| 添加展会</Title>
                <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                    请根据表格填写相应的信息，以确保展会信息的<Text mark > 正常收集和审核 </Text>。
                </Paragraph>
            </Typography>
            <Form>
                <Form.Item >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            // prefix={<Icon type="" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="展会名称"
                        />,
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}

export const AddExpo = Form.create({ name: 'horizontal_login' })(formComponent)