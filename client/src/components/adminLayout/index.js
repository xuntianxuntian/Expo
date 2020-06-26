import React from 'react'
import { Route } from 'react-router-dom'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { Layout } from 'antd'
// import axios from 'axios'
import { MyExpo } from './expo/myExpo'

import { NavBar } from './navbar'
import SiderBar from './siderbar'
import { AddExpo } from './expo/addExpo';







class AdminLayout extends React.Component {
    // constructor(props) {
    //   super(props)
    // }


    componentDidMount() {

    }

    render() {


        const { Content, Footer } = Layout



        return (
            <Layout style={{ height: '100%' }}>
                <NavBar />
                <Layout height={'100%'}>
                    <SiderBar />
                    <Layout style={{ padding: '0 24px 24px', height: '100%', paddingBottom: '50px' }}>
                        <Content style={{ background: '#fff', padding: 0, margin: 0, height: '100%' }}>
                            <Route path='/admin/myExpo' component={MyExpo} />
                            <Route path='/admin/addExpo' component={AddExpo} />
                           
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}



export default AdminLayout