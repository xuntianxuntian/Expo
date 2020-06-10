import React, { Component } from "react";
import { Table, Divider, Typography } from 'antd';


import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getInfoTempList, addToInfoTempList, deleteToInfoTempList, changeDefaultToInfoTempList } from '../../../../../actions/infoTemp.action'


class InfoTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.getInfoTempList()
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            }).catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            })
    }

    onSetDeafaultTemp = (e, info) => {
        e.preventDefault()
        console.log(info)
        this.setState({
            ...this.state,
            isLoading: true
        })
        this.props.infoTempList.forEach(infoTemp => {
            if (infoTemp.id === info.id) {
                infoTemp.isdefault = true
            } else {
                infoTemp.isdefault = false
            }
        })
        this.props.changeDefaultToInfoTempList(this.props.infoTempList)
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false
                })
            }).catch(err => console.log(err))
    }


    render() {

        const { Text } = Typography

        const columns = [
            {
                title: '模板名称',
                dataIndex: 'tempName',
                key: 'tempName',
                render: text => <a>{text}</a>,
            },
            {
                title: '施工负责人',
                dataIndex: 'bmName',
                key: 'bmName',
            },
            {
                title: '电力负责人',
                dataIndex: 'emName',
                key: 'emName',
            },
            {
                title: '预留邮箱',
                key: 'email',
                dataIndex: 'email',

            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    let info = record
                    if (record.isdefault) {
                        return (
                            <span>
                                <a><Text disabled code>当前默认模板</Text></a>
                                <Divider type="vertical" />
                                <a>修改</a>
                                <Divider type="vertical" />
                                <a>删除</a>
                            </span>
                        )
                    } else {
                        return (
                            <span>
                                <a onClick={e => this.onSetDeafaultTemp(e, info)}>设为默认模板</a>
                                <Divider type="vertical" />
                                <a>修改</a>
                                <Divider type="vertical" />
                                <a>删除</a>
                            </span>
                        )
                    }
                },
            },
        ]


        return (
            <div style={{margin:'0 20px'}}>
                <Table columns={columns} dataSource={this.props.infoTempList}
                    loading={this.state.isLoading}
                    pagination={false}
                    bordered={true}
                />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    infoTempList: state.infoTempList
})

InfoTemplate.propTypes = {
    infoTempList: PropTypes.array.isRequired,
    getInfoTempList: PropTypes.func.isRequired,
    addToInfoTempList: PropTypes.func.isRequired,
    deleteToInfoTempList: PropTypes.func.isRequired,
    changeDefaultToInfoTempList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { changeDefaultToInfoTempList, getInfoTempList, addToInfoTempList, deleteToInfoTempList })(InfoTemplate)