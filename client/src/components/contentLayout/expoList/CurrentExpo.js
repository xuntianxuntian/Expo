import React from 'react'
import {Input} from 'antd'
import ExpoList from './index';

const {Search} = Input



const CurrentExpo = (props) => {
    return (
        <div >
            <h3 style={{textAlign:"center",marginTop:"80px"}}>请选择参加的展会</h3>
            <Search
                addonBefore="展会查询"
                placeholder="请输入相应的展会名称、关键字查询"
                enterButton
                size="large"
                onSearch={value => console.log(value)}
                style={{width:"60%",marginLeft:'20%',marginBottom:"150px"}}
            />
            <ExpoList></ExpoList>
        </div>
    )
}
export default CurrentExpo