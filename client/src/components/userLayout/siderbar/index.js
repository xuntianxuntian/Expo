import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import toogleHandler from '../../../actions/toogleSiderBar.action'
import { connect } from 'react-redux'
import isEmpty from '../../../utils/isEmpty';



class SiderBar extends React.Component {

    constructor(props) {
        super(props)

    }


    

    render() {

        const { SubMenu } = Menu
        const { Sider } = Layout

        return (
            <Sider width={200} height={'100%'} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    // defaultSelectedKeys={['myExpo']}
                    defaultOpenKeys={['expo']}
                    style={{ height: '100%', borderRight: 0 }}
                    openkeys={this.props.location ? this.props.location : null}
                    selectedKeys={[this.props.location] ? [this.props.location] : null}
                // onClick={this.menuOnClick}
                >
                    <SubMenu
                        key="expo"
                        title={
                            <span>
                                <Icon type="user" />
                                展会选择
                                </span>
                        }
                    >
                        <Menu.Item key="myExpo">
                            <Link to="/myExpo">我的展会</Link>
                        </Menu.Item>
                        <Menu.Item key="getExpo">
                            <Link to="/getExpo">展会查询</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="profile"
                        title={
                            <span>
                                <Icon type="laptop" />
                                资质手续
                                </span>
                        }

                    >
                        <Menu.Item key="qualification"><Link to="/qualification">公司资质</Link></Menu.Item>
                        <Menu.Item key="booth"><Link to="/booth">我的展位</Link></Menu.Item>
                        <Menu.Item key="boothDesign"><Link to="/boothDesign">手续申报</Link></Menu.Item>
                        <Menu.Item key="info"><Link to="/info">其他信息</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="rentList"
                        title={
                            <span>
                                <Icon type="notification" />
                                工程租赁
                        </span>
                        }
                    >
                        <Menu.Item key="itemlist"><Link to="/itemlist">添加项目</Link></Menu.Item>
                        <Menu.Item key="orderlist"><Link to="/orderlist">订单详情</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}


const mapStateToProps = state => ({
    location: state.toogleSiderBar.location
})

SiderBar.propTypes = {
    location: PropTypes.string.isRequired,
    toogleHandler: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { toogleHandler })(SiderBar)