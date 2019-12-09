import React from 'react'
import { Input } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isloading } from '../../../actions/isloading.action'
import tooglehandler from '../../../actions/toogleSiderBar.action'


import ExpoList from './ExpoList';
import axios from 'axios'
import LoadingContentComponent from '../content/LoadingContent.component';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import isEmpty from '../../../utils/isEmpty';

const { Search } = Input



class GetExpo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [{}],
            onSearchLoading:false
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[1])
        this.props.tooglehandler('getExpo')
        this.props.isloading(true)
        console.log('asda22222')
        axios.get('/api/expo/expoList/ExpoList.json').then(res => {
            this.props.isloading(false)
            this.setState({
                dataSource: res.data
            })
        }).catch(err => console.log(err))
    }

    onSearchHandler = (value) => {
        this.setState({
            ...this.state,
            onSearchLoading:true
        })
        axios.get('/api/expo/expoList/ExpoList.json')
        .then(res => {
            this.setState({
                ...this.state,
                onSearchLoading:false
            })
            if (value === null || value === '') {
                this.setState({
                    dataSource: res.data
                })
                // console.log(defaultData)
            } else {
                let dataReg = new RegExp(value)
                this.setState({
                    dataSource: res.data.filter(
                                    (item) => {
                                        return dataReg.test(item.expoTitle)
                                    }
                                )
                })

            }
        })
        .catch(err => console.log(err))
        

    }


    render() {
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
                    this.state.onSearchLoading?<LoadingContentComponent />:
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

export default connect(mapStateToProps, { isloading,tooglehandler })(GetExpo)