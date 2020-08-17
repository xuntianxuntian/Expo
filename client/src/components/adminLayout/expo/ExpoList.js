import React, { Component } from 'react'
import { Button,  Table,} from 'antd'
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



class ExpoList extends Component {

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
    

    //点击进入展会按钮的回调
    onInExpoClick = (e, cid) => {
        e.preventDefault()
        this.props.currentExpo(cid)
        let btn = document.getElementsByClassName("ant-btn-primary intoExpoClass")[0]
        if (e.target == btn) {
            return null
        } else if (btn == undefined) {
            e.target.classList.remove('ant-btn-default')
            e.target.classList.add('ant-btn-primary')
            e.target.innerHTML = '当前展会'
            //切换展会时重新加载boothList
            axios.get('/api/admin/booth/list.json', { params: { cid } })
                .then(
                    res => {
                        if (res.data.length) {
                            res.data.forEach((booth, index) => {
                                booth['key'] = index
                            })
                            this.props.changeToBoothList(res.data)
                        } else {
                            this.props.changeToBoothList({})
                        }
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
                axios.get('/api/booth/listAll', { params: { cid } })
                    .then(
                        res => {
                            if (res.data.length) {
                                res.data.forEach((booth, index) => {
                                    booth['key'] = index
                                })
                                this.props.changeToBoothList(res.data)
                            } else {
                                this.props.changeToBoothList({})
                            }
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
                dataIndex: 'expoName',
                key: 'expoName',
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
                render: (text, record, index) => {
                    if (isEmpty(localStorage.currentExpoCID) && index === 0) {
                        return (<span>
                            <Button type='primary' className='intoExpoClass' onClick={(e) => this.onInExpoClick(e, record.cid)}>当前展会</Button>
                        </span>)
                    } else if (localStorage.currentExpoCID === record.cid) {
                        return (<span>
                            <Button type='primary' className='intoExpoClass' onClick={(e) => this.onInExpoClick(e, record.cid)}>当前展会</Button>
                        </span>)
                    } else {
                        return (<span>
                            <Button type='default' className='intoExpoClass' onClick={(e) => this.onInExpoClick(e, record.cid)}>点击切换</Button>
                        </span>)
                    }

                }
            },
        ]
        let data = []
        if (this.props.expos.length) {

            this.props.expos.forEach((expo, key) => {
                expo.key = key
            })
            data = this.props.expos
        }


        return (
            <div>
                <Table columns={columns} dataSource={data} pagination={pagination} loading={this.props.tableLoading} />
                <Button type="primary" size='large' style={{ marginLeft: '45%' }}><Link to='/admin/addExpo'>添加展会</Link></Button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    currentExpoCID: state.switchOperateExpo,
})



ExpoList.propTypes = {
    currentExpoCID: PropTypes.object.isRequired,
    currentExpo: PropTypes.func.isRequired,
    changeToBoothList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { currentExpo ,changeToBoothList})(ExpoList)
