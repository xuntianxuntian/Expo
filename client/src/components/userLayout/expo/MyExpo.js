import React, { Component, Fragment } from 'react'
import ExpoCard from './ExpoCard';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Typography, Divider, Empty, Button } from 'antd'
import store from '../../../store'


import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import currentExpo from '../../../actions/currentExpo.action'

class MyExpo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            joinedExpoList: [],
            tableLoading: true
        }

    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "myExpo"
        })

        axios.get('/api/user/expo/joinedList')
            .then(res => {
                if (res.status == 200) {
                    const joinedExpoList = res.data.expoList
                    this.setState({
                        ...this.state,
                        joinedExpoList
                    })
                    this.setState({
                        ...this.state,
                        tableLoading: false
                    })
                }
                // this.state.expos.foreach(expo =>{
                //     localStorage.expoCID.push(expo.cid)
                // })

            })
            .catch(err => console.log(err))
    }
    //强制清除组件卸载时的异步请求和setState操作
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return state
        }
    }

    render() {

        const { Paragraph, Text, Title } = Typography

        return (
            this.state.joinedExpoList.length > 0 ?
                (<Fragment>
                    <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                        <Title level={4} >| 我的展会</Title>
                        <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                            请先添加您要参与的展会，以进行相关的<Text mark > 资质审核和费用核算 </Text>。
                        </Paragraph>
                    </Typography>
                    <Divider />
                    <ExpoCard expos={this.state.joinedExpoList} tableLoading={this.state.tableLoading} />
                </Fragment>) : <div style={{ height: '100%' }}>
                    <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                        <Title level={4} >| 我的展会</Title>
                        <Paragraph style={{ textIndent: '8px' }}>
                            请先添加您要参与的展会，以进行相关的<Text mark > 资质审核和费用核算 </Text>。
                    </Paragraph>
                    </Typography>
                    <Divider />
                    <Empty
                        style={{ marginTop: '100px' }}
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        imageStyle={{
                            height: 120,
                        }}
                        description={
                            <Text type='secondary'>没有找到相关信息</Text>
                        }
                    >
                        <Button type="primary"><Link to='/getExpo'>添加展会</Link></Button>
                    </Empty>
                </div>

        )
    }
}

// const mapStateToProps = state => ({
//     // lastOperateExpoCID: state.login.lastOperateExpoCID,
//   })



//   MyExpo.propTypes = {
//     // lastOperateExpoCID:PropTypes.string.isRequired,
//     lastOperateExpo: PropTypes.func.isRequired
//   }

export default MyExpo
//   export default connect(mapStateToProps, { lastOperateExpo })(MyExpo)

