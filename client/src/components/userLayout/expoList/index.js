import React, { useState } from 'react'
import { List, Avatar, Icon, Button } from 'antd';

const ExpoList = (props) => {
    const listData = props.dataSource;
    const [pageNum, setPageNum] = useState(1)
    // console.log(props)
    const iconpng = (<Icon type="play-circle" />)

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    )

    const pagination = {
        current: pageNum,
        onChange: page => {
            setPageNum(page)
        },
        pageSize: 3
    }

    const footer = (<div><b>ant design</b> footer part</div>)
    const actions = [

    ]




    const renderItem = (item) => {
        return (
            <List.Item
                key={item.expoTitle}
                actions={[<Button type='primary' ket={item.expoId}>添加展会</Button>]}
                extra={(<img
                    width={272}
                    alt="logo"
                    src={item.expoLogoImage}
                />)}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.expoLogoImage} />}
                    title={<a href={item.expoDescription}>{item.expoTitle}</a>}
                    description={item.expoOpenDate}
                />
                {item.expoProfile}
            </List.Item>
        )
    }

    return (
        <List
            itemLayout={"vertical"}
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