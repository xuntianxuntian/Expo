import { Form, Row, Col, Input, Button, Typography, Divider } from 'antd'
import React from 'react'

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props)
    }

    // To generate mock Form.Item
    getFields() {
        const { Text } = Typography
        const { getFieldDecorator } = this.props.form;
        const children = []
        const childrenInfo = [
            { title: '模板名称', fieldName: 'tempName'},
            { title: '展位最高点高度(单位:m)', fieldName: 'maxHt' },
            { title: '展位结构最大跨度(单位:m)', fieldName: 'maxSp'},
            { title: '展位承重墙最小厚度(单位:cm)', fieldName: 'minTh' },
            { title: '展位用电总功率(单位:kw)', fieldName: 'totalEp' },
            { title: '展位电缆规格(单位:mm²)', fieldName: 'cableTp' },
            { title: '施工负责人', fieldName: 'buildMgrName'},
            { title: '联系电话', fieldName: 'buildMgrTel'},
            { title: '电力负责人', fieldName: 'elecMgrName'},
            { title: '联系电话', fieldName: 'elecMgrTel'},
            { title: '联系邮箱', fieldName: 'email'},
        ]
        for (let i = 0; i < childrenInfo.length; i++) {
            children.push(
               
                    <Form.Item label={childrenInfo[i].title} key={i} >

                        {getFieldDecorator(childrenInfo[i].fieldName, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input/>)}
                            
                    </Form.Item>
              
            )
        }
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
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
            <div style={{width:'100%'}}>
                <Form {...formItemLayout}  onSubmit={this.handleSearch}>
                    {this.getFields()}
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
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