import React, { useState } from 'react'
import { List, Avatar, Button, Typography  } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios'

const ExpoList = (props) => {
    const listData = props.dataSource;
    const [pageNum, setPageNum] = useState(1)
    // console.log(props)

    // const IconText = ({ type, text }) => (
    //     <span>
    //         <Icon type={type} style={{ marginRight: 8 }} />
    //         {text}
    //     </span>
    // )
    const { Text , Title} = Typography

    const pagination = {
        current: pageNum,
        onChange: page => {
            setPageNum(page)
        },
        pageSize: 2
    }

    const footer = (<div><b>注意:</b> 添加完成后请到<Link to="/myExpo"><Text code>我的展会</Text></Link>选择你想进入的展会</div>)

    function onAddExpoClick(cid,e){
        e.preventDefault()
        console.log(e.target.innerHTML)
        e.target.disabled = true
        e.target.innerHTML = `已添加`
        let expoCIDAdded = JSON.parse(localStorage.expoCID)
        expoCIDAdded.push(cid)
        localStorage.setItem('expoCID',JSON.stringify(expoCIDAdded))
        axios.put('/api/user/addExpo',{cid})
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }


    const renderItem = (item) => {
        const localExpoCID = JSON.parse(localStorage.expoCID)
        let isAdded = false
        let btnText = '添加展会'
        for(let i=0;i<localExpoCID.length;i++){
            if(localExpoCID[i] === item.cid){
                isAdded = true
                break
            }else{
                isAdded = false
            }
        }
        if(isAdded){
            btnText = '已添加'
        }
        return (
            <List.Item
                key={item.expoName}
            >
                <List.Item.Meta
                    // avatar={<Avatar src={item.expoLogoImage} />}
                    title={<div>
                        <a href={item.expoUrl} target='blank'><Text style={{fontSize:'1.2rem',fontWeight:'bold'}}>{item.expoName}</Text></a>
                        <Button disabled={isAdded} onClick={(e) => onAddExpoClick(item.cid,e)} style={{float:'right',marginTop:'12px'}} type='primary' key={item.cid}>{btnText}</Button>
                    </div>}
                    description={<div>
                        <div>
                            <Text>{item.openTime}</Text>至<Text>{item.closeTime}</Text>
                        </div>
                        <div>
                            <Text>主办单位:{item.hostBy}</Text>
                        </div>
                    </div>}
                />
                {/* {item.desc} */}

            </List.Item>
        )
    }

    return (
        <List
            itemLayout={"horizon"}
            size={"large"}
            pagination={pagination}
            dataSource={listData}
            footer={footer}
            renderItem={renderItem}
            style={{ backgroundColor: "white", width: '100%', padding: '20px', paddingBottom: '120px' }}
        ></List>
    )
}

export default ExpoList