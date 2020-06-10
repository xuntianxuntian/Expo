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
        // this.state = {
        //     isCreditAuthorized: false,
        //     isConstructionAuthorized: false,
        //     authMsg:{}
        // }
    }


    componentDidMount() {
        console.log(this.props)

        // axios.get('/api/user/company')
        //     .then(res => {
        //         console.log(res)
        //         if(res.data.comName){
        //             this.setState({
        //                 ...this.state,
        //                 isCreditAuthorized:res.data.isAuthorized.CrAu,
        //                 isConstructionAuthorized:res.data.isAuthorized.CoAu,
        //                 authMsg:res.data.isAuthorized.erMsg,
        //             })
        //         }
        //     })
        //     .catch(err => console.log(err))
    }


    render() {
        const {
            addr,
            bank,
            account,
            taxId,
            name,
            tel, } = this.props.company
        const {
            li,//license
            le,//level
            err } = this.props.company.auth

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
                <Descriptions title={name} column={column}>
                    <Descriptions.Item label="地址" span={2}>{addr}</Descriptions.Item>
                    <Descriptions.Item label="电话" span={1}>{tel}</Descriptions.Item>
                    <Descriptions.Item label="证件号" span={1}>{taxId}</Descriptions.Item>
                    <Descriptions.Item label="银行" span={1}>{bank}</Descriptions.Item>
                    <Descriptions.Item label="账号" span={1}>{account}</Descriptions.Item>
                    <Descriptions.Item label="营业执照">{err.li ? <Tag color="red">未通过</Tag> : li ?
                        <Tag color="green">已通过</Tag> : <Tag color="orange">审核中</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="资质证件">{err.le ? <Tag color="red">未通过</Tag> : le ?
                        <Tag color="green">已通过</Tag> : <Tag color="orange">审核中</Tag>}
                    </Descriptions.Item>
                </Descriptions>

                {
                    li && le ?
                        <Result
                            status="success"
                            title="审核通过！"
                            subTitle="现在您可以添加展位并申报相关展会信息,或者更新您的公司信息!"
                            extra={[
                                <Button type="primary" key="console">
                                    <Link to='/booth'>添加展位</Link>
                                </Button>,
                                <Popconfirm
                                    title="确定删除之前的公司信息？"
                                    onConfirm={e => onUpdateCompanyConfirm(e)}
                                    okText="确认"
                                    cancelText="取消"
                                    key="companyToUploadButton"
                                >
                                    or 重新上传
                                </Popconfirm>
                            ]}
                        >
                        </Result> : err.li || err.le ?
                            <Result
                                status="error"
                                title="审核未通过！"
                                subTitle=""
                                extra={[
                                    <Button type="primary" key="console" onClick={e => onUpdateFailed(e)}>
                                        修改
                                    </Button>,
                                ]}
                            >
                                <div className="desc">
                                    <Paragraph>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            请根据提示信息修改并重新提交正确的申请:
                                </Text>
                                    </Paragraph>
                                    {err.li ?
                                        <Paragraph>
                                            <Icon style={{ color: 'red' }} type="close-circle" />
                                            <Text > 营业执照:{err.li}</Text>
                                        </Paragraph> : ''
                                    }
                                    {err.le ?
                                        <Paragraph>
                                            <Icon style={{ color: 'red' }} type="close-circle" />
                                            <Text > 资质证书:{err.le}</Text>
                                        </Paragraph> : ''
                                    }
                                </div>
                            </Result> :
                            <Result
                                status="info"
                                title="审核中，请耐心等待..."
                                subTitle="您可以通过电话询问相关人员以访问审核进度:027-85315811"
                                extra={[

                                ]}
                            >
                            </Result>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    companyFromStore: state.companyToUpload
})

QualifiedList.propTypes = {
    companyFromStore: PropTypes.object.isRequired,
    companyToUpload: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { companyToUpload })(QualifiedList)