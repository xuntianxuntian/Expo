import React, { Component } from 'react'
import { Card, Icon, Button, Typography, Table, Divider, Tag } from 'antd'
import { Link } from 'react-router-dom'
import store from '../../../store'
import { TOOGLE_SIDERBAR } from '../../../actions/types'
import isEmpty from '../../../utils/isEmpty'
import axios from 'axios'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import currentExpo from '../../../actions/currentExpo.action'
import { changeToBoothList } from '../../../actions/changeBoothList.action'


import '../../../css/expo/expoCard.css'



class ExpoCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            intoExpo: 'primary',
            pageNum: 1
        }
    }

    onAddExpo = (e) => {
        localStorage.setItem('sideLocation', 'getExpo')
        store.dispatch({
            type: TOOGLE_SIDERBAR,
            payload: 'getExpo'
        })
    }

    //通过展会的名称查询返回响应的网址
    getExpoUrl = (expoName) => {
        for (let i = 0; i < this.props.expos.length; i++) {
            if (expoName == this.props.expos[i].expoName) {
                return this.props.expos[i].expoUrl
            }
        }
        return ''
    }
    componentDidMount() {

    }
    componentWillUpdate() {

    }

    //点击进入展会按钮的回调
    onInExpoClick = (e, eid) => {
        e.preventDefault()
        this.props.currentExpo(eid)
        let btn = document.getElementsByClassName("ant-btn-primary intoExpoClass")[0]
        if (e.target == btn) {
            return null
        } else if (btn == undefined) {
            e.target.classList.remove('ant-btn-default')
            e.target.classList.add('ant-btn-primary')
            e.target.innerHTML = '当前展会'
            //切换展会时重新加载boothList
            axios.get(`/api/user/booth/list/${eid}`)
                .then(
                    res => {
                        let boothList = []
                        const booth = res.data.booth
                        if (booth.length) {
                            boothList = booth.map(
                                (b, i) => {
                                    return { ...b, key: i }
                                }
                            )
                        }
                        localStorage.setItem('boothList',JSON.stringify(boothList))
                        this.props.changeToBoothList(boothList)
                    })
                    .catch(err => {
                        console.log(err)
                        this.props.changeToBoothList([])
                    })
                } else {
                    btn.classList.remove("ant-btn-primary")
                    btn.classList.add("ant-btn-default")
                    btn.innerHTML = '点击切换'
                    if (e.target.classList.contains('ant-btn-primary')) {
                        
                        return null
                    } else {
                        e.target.classList.remove('ant-btn-default')
                        e.target.classList.add('ant-btn-primary')
                        e.target.innerHTML = '当前展会'
                        //切换展会时重新加载boothList
                        axios.get(`/api/user/booth/list/${eid}`)
                        .then(
                            res => {
                                let boothList = []
                                const booth = res.data.booth
                                if (booth.length) {
                                    boothList = booth.map(
                                        (b, i) => {
                                            return { ...b, key: i }
                                        }
                                        )
                                    }
                            localStorage.setItem('boothList',JSON.stringify(boothList))
                            this.props.changeToBoothList(boothList)
                        })
                    .catch(err => {
                        console.log(err.response)
                        this.props.changeToBoothList([])
                    })
            }
        }


    }




    render() {
        // const { Meta } = Card
        // const { Title, Text } = Typography

        const pagination = {
            current: this.state.pageNum,
            onChange: page => {
                this.setState({
                    ...this.state,
                    pageNum: page
                })
            },
            pageSize: 5
        }

        const columns = [
            {
                title: '展会名称',
                dataIndex: 'eName',
                key: 'eName',
                render: text => <a href={this.getExpoUrl(text)} target='blank'>{text}</a>,
            },
            {
                title: '举办时间',
                dataIndex: 'openTime',
                key: 'openTime',
            },
            {
                title: '结束时间',
                dataIndex: 'closeTime',
                key: 'closeTime',
            },
            {
                title: '报馆截止日期',
                key: 'commitTime',
                dataIndex: 'commitTime',
            },
            {
                title: '展会选择',
                key: 'action',
                render: (_, record) => {
                    let current_eid = localStorage.getItem('current_eid')
                    if (isEmpty(current_eid)) {
                        return (<span>
                            <Button type='default' className='intoExpoClass' onClick={(e) => this.onInExpoClick(e, record.eid)}>当前展会</Button>
                        </span>)
                    } else if (current_eid === record.eid) {
                        return (<span>
                            <Button type='primary' className='intoExpoClass' onClick={(e) => this.onInExpoClick(e, record.eid)}>当前展会</Button>
                        </span>)
                    } else {
                        return (<span>
                            <Button type='default' className='intoExpoClass' onClick={(e) => this.onInExpoClick(e, record.eid)}>点击切换</Button>
                        </span>)
                    }

                }
            },
        ]

        this.props.expos.forEach((expo, key) => {
            expo.key = key
        })
        const data = this.props.expos
        console.log(data)
        return (
            <div>
                <Table columns={columns} dataSource={data} pagination={pagination} loading={this.props.tableLoading} />
                <Button type="primary" size='large' style={{ marginLeft: '45%' }}><Link to='/getExpo'>添加展会</Link></Button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    currentExpoCID: state.switchOperateExpo,
})



ExpoCard.propTypes = {
    currentExpoCID: PropTypes.object.isRequired,
    currentExpo: PropTypes.func.isRequired,
    changeToBoothList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { currentExpo, changeToBoothList })(ExpoCard)
