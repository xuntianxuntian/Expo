import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import ExpoList from './ExpoList';
import axios from 'axios'

const { Search } = Input



const GetExpo = (props) => {

    const initialSearchValue = ''
    const initialDataSource = []


    const [searchValue, setSearchValue] = useState(initialSearchValue)
    const [dataSource, setDatasource] = useState(initialDataSource)


    //初始化List组件的dataSource，匹配相应的props进行数据传递
    //添加一个对一个状态的监听（订阅），当值变化时，调用useEffect函数
    useEffect(
        () => {
            axios.get('/api/expo/expoList/ExpoList.json').then(res => {
                setDatasource(res.data)
            }).catch(err => console.log(err))
        }, [searchValue]
    )

    //搜索包含相应内容的展会标题，通过axios异步加载接口数据
    //并使用filter进行筛查，同时异步的setDatasource，等待函数组件的重新Render
    const onSearchHandler = (value) => {
        axios.get('/api/expo/expoList/ExpoList.json')
            .then(res => {
                if (value === null || value === '') {
                    setDatasource(res.data)
                    // console.log(defaultData)
                } else {
                    let dataReg = new RegExp(value)
                    setDatasource(
                        res.data.filter(
                            (item) => {
                                return dataReg.test(item.expoTitle)
                            }
                        ))

                }
            })
            .catch(err => console.log(err))

    }


    return (
        <div >
            <h3 style={{ textAlign: "center", marginTop: "80px" }}>请选择参加的展会</h3>
            <Search
                addonBefore="展会查询"
                placeholder="请输入相应的展会名称、关键字查询"
                enterButton
                size="large"
                onSearch={value => onSearchHandler(value)}
                style={{ width: "60%", marginLeft: '20%', marginBottom: "150px" }}
            />
            <ExpoList dataSource={dataSource} ></ExpoList>
        </div>
    )
}
export default GetExpo