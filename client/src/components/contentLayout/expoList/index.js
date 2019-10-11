import React from 'react'
import { List, Avatar, Icon, Pagination } from 'antd';

const ExpoList = (props) => {
    const listData = [];
    const iconpng = (<Icon type="play-circle" />)
    for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'url',
            title: `2019年第五届湖北教育装备展 ${i}`,
            avatar: 'http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    )

    const pagination = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 3
    }

    const footer = (<div><b>ant design</b> footer part</div>)
    const actions = [
        <IconText type="star-o" text="156" key="list-vertical-star-o" />,
        <IconText type="like-o" text="156" key="list-vertical-like-o" />,
        <IconText type="message" text="2" key="list-vertical-message" />,
    ]

    const extra = (<img
        width={272}
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
    />)



    const renderItem = (item) => {
        return (
            <List.Item
                key={item.title}
                actions={actions}
                extra={extra}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                />
                {item.content}
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
            style={{backgroundColor:"white",width:'100%',padding:'20px'}}
        ></List>
    )
}

export default ExpoList