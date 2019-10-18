import {
    Form,
    Select,
    Input
} from 'antd';
import React from 'react'

const { Option } = Select;

class CompanyAuthForm extends React.Component {


    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <h2 style={{ paddingLeft: '80px', paddingTop: '40px', fontWeight: 'bold' }}>公司资质认证</h2>
                <Form {...formItemLayout} style={{ backgroundColor: 'white', paddingBottom: '50px' }}>
                    <Form.Item label = "公司名称">
                        
                    </Form.Item>
                    
                </Form>
            </div>

        );
    }
}

export const CompanyAuth = Form.create({ name: 'validate_other' })(CompanyAuthForm)