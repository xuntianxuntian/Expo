import React, { Component } from 'react'
import { Descriptions, Tag, Button, Result, Typography, Icon, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import companyToUpload from '../../../../actions/companyToUpload.action'
import { COMPANY_TO_UPLOAD } from '../../../../actions/types'


class QualifiedList extends Component {

    constructor(props) {
        super(props)

    }


    componentDidMount() {
        console.log(this.props)
    }


    render() {
        const { cAddr, bank, account, taxId, cName, cTel, license, level } = this.props.company

        const column = { xs: 2, sm: 2, md: 3 }
        const { Paragraph, Text } = Typography

        //点击 审核成功页面 重新上传的回调函数
        const onUpdateCompanyConfirm = (e) => {
            this.props.companyToUpload(COMPANY_TO_UPLOAD, this.props.company)
        }
        const onUpdateFailed = (e) => {
            this.props.companyToUpload(COMPANY_TO_UPLOAD, this.props.company)
        }

        return (
            <div style={{ margin: '10px 50px' }}>
                <Descriptions title={cName} column={column}>
                    <Descriptions.Item label="地址" span={2}>{cAddr}</Descriptions.Item>
                    <Descriptions.Item label="电话" span={1}>{cTel}</Descriptions.Item>
                    <Descriptions.Item label="证件号" span={1}>{taxId}</Descriptions.Item>
                    <Descriptions.Item label="银行" span={1}>{bank}</Descriptions.Item>
                    <Descriptions.Item label="账号" span={1}>{account}</Descriptions.Item>
                    <Descriptions.Item label="营业执照">
                        {license}
                    </Descriptions.Item>
                    <Descriptions.Item label="资质证件">
                        {level}
                    </Descriptions.Item>
                </Descriptions>

                <Button type="primary">
                    修改信息
                </Button>



            </div>
        )
    }
}




export default QualifiedList