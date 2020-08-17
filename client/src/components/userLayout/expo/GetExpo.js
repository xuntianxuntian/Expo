import React from 'react'
import { Input } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isloading } from '../../../actions/isloading.action'
import tooglehandler from '../../../actions/toogleSiderBar.action'


import ExpoList from './ExpoList';
import axios from 'axios'
import LoadingContentComponent from '../content/LoadingContent.component';
// import renderEmpty from 'antd/lib/config-provider/renderEmpty';
// import isEmpty from '../../../utils/isEmpty';





class GetExpo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [{}],
            onSearchLoading: false
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        this.props.tooglehandler('getExpo')
        this.props.isloading(true)
        axios.get('/api/user/listExpo').then(res => {
            const { expo } = res.data
            console.log(expo)
            this.props.isloading(false)
            this.setState({
                dataSource: expo
            })
            localStorage.setItem('expoData', JSON.stringify(this.state.dataSource))
        }).catch(err => console.log(err))
    }
    //强制清除组件卸载时的异步请求和setState操作
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return state
        }
    }

    onSearchHandler = (value) => {
        //用LocalStorage来本地存储数据  UNSAFE----------------------
        // let searchReg = new RegExp(value)
        // console.log(JSON.parse(localStorage.expoData))
        // const filteredData = JSON.parse(localStorage.expoData).filter(
        //     (expo) =>{
        //         return searchReg.test(expo.expoName)
        //     }
        // )
        // this.setState({
        //     ...this.state,
        //     dataSource:filteredData
        // })----------------------------------------------------
        this.setState({
            ...this.state,
            onSearchLoading: true
        })
        axios.post('/api/user/expo/queryByName', { queryString: value })
            .then(res => {
                this.setState({
                    ...this.state,
                    onSearchLoading: false
                })
                this.setState({
                    ...this.state,
                    dataSource: res.data.expoList
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        const { Search } = Input
        return (this.props.loading ? <LoadingContentComponent /> :
            <div >
                <h3 style={{ textAlign: "center", marginTop: "80px" }}>请选择参加的展会</h3>
                <Search
                    addonBefore="展会查询"
                    placeholder="请输入相应的展会名称、关键字查询"
                    enterButton
                    size="large"
                    onSearch={value => this.onSearchHandler(value)}
                    style={{ width: "60%", marginLeft: '20%', marginBottom: "150px" }}
                />
                {
                    this.state.onSearchLoading ? <LoadingContentComponent /> :
                        <ExpoList dataSource={this.state.dataSource} ></ExpoList>
                }

            </div>
        )
    }

}


const mapStateToProps = state => ({
    loading: state.loading.isloading
})

GetExpo.propTypes = {
    loading: PropTypes.bool.isRequired,
    isloading: PropTypes.func.isRequired,
    tooglehandler: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { isloading, tooglehandler })(GetExpo)