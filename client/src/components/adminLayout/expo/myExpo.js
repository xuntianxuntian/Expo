import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Typography, Divider } from 'antd'
import ExpoList from './ExpoList'
import store from '../../../store'

export const MyExpo = (props) => {

    const [expo, setExpo] = useState([{}])

    const { Paragraph, Text, Title } = Typography

    const getExpo = () => {
        axios.get('/apf/admin/myExpo.json')
            .then(res => {
                setExpo(res.data)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "myExpo"
        })
        getExpo()
    }, [])



    return (
        <Fragment>
            <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                <Title level={4} >| 我的展会</Title>
                <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                    请先添加您要参与的展会，以进行相关的<Text mark > 资质审核和费用核算 </Text>。
                        </Paragraph>
            </Typography>
            <Divider />
            <ExpoList expos={expo} />
        </Fragment>
    )
}

