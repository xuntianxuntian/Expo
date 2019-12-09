import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LoadingContent extends Component {

    constructor(props){
        super(props)
    }


    render() {
        console.log(this.props)
        return (
            <div style = {{position:'absolute',right:'37%',top:'47%'}}>
                <Icon type="loading" style={{ fontSize: 24 }} spin />
                Loading...
            </div>
        )
    }
}



const  mapStateToProps = state =>({
    isloading:state.loading.isloading
})

LoadingContent.propTypes = {
    isloading:PropTypes.bool.isRequired
}

export default connect(mapStateToProps,{})(LoadingContent)
