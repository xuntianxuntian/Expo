import React from 'react'
import axios from 'axios'
import { Typography, Divider, Tag, Button, Modal, Table,Icon,Input } from 'antd'
import store from '../../../store'
import Highlighter from 'react-highlight-words';

class BoothList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModel: false,
            searchText: '',
            searchedColumn: '',
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "boothList"
        })
    }

    onChangeExpo = (e) => {
        e.preventDefault()
        console.log(e)
        this.setState({
            ...this.state,
            showModel: true
        })
    }

    handleModelCancel = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            showModel: false
        })
    }
    handleModelOk = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            showModel: false
        })
    }
    getColumnSearchProps = (dataIndex,title) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 ${title}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {



        const columns = [
            {
                title: '展位号',
                dataIndex: 'boothId',
                key: 'boothId',
                ...this.getColumnSearchProps('boothId','展位号'),
            },
            {
                title: '展位名称',
                dataIndex: 'boothName',
                key: 'boothName',
                ...this.getColumnSearchProps('boothName','展位名称'),
            },
            {
                title: '展位面积',
                dataIndex: 'boothSize',
                key: 'boothSize',
                
            },
            {
                title: '服务商',
                dataIndex:'boothBuilder',
                key: 'boothBuilder',
                ...this.getColumnSearchProps('boothBuilder','展位名称'),
            },
            {
                title: '施工审核',
                dataIndex:'boothCheck',
                key: 'boothCheck',
                render: text => <span >{text}</span>,
            },
            {
                title: '展位费用',
                dataIndex:'boothOrder',
                key: 'boothOrder',
            },
            {
                title: '施工联系人',
                dataIndex:'boothContact',
                key: 'boothContact',
            },
            {
                title: '',
                key: 'action',
                render: text => <a>审核</a>,
            },
        ];

        const boothData = [
            {
                key: '1',
                boothId: 'A2B01',
                boothName: '中国绿地控股有限公司',
                boothSize: 36,
                boothBuilder: '武汉亚美空间展览服务有限公司',
                boothCheck: '未提交',
                boothOrder: '无',
                boothContact: '陈经理 15027014048'
            },
            {
                key: '2',
                boothId: 'A1A05',
                boothName: '中国航天制造有限公司',
                boothSize: 36,
                boothBuilder: '武汉瑞美展览服务有限公司',
                boothCheck: '未提交',
                boothOrder: '无',
                boothContact: '陈经理 15027014048'
            },
            {
                key: '3',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                boothBuilder: '武汉多人行展览服务有限公司',
                boothCheck: '未提交',
                boothOrder: '无',
                boothContact: '陈经理 15027014048'
            },
        ];


        const { Paragraph, Text, Title } = Typography

        return (
            <div>

                <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                    <Title level={4} >| 展位总览</Title>
                    <Paragraph style={{ textIndent: '8px', display: 'inline-block', marginRight: '20%' }}>
                        查看当前的展位状态，进行相关的<Text mark > 验证操作和修改 </Text>。
                        </Paragraph>
                </Typography>
                <Divider style={{ margin: '10px' }} />
                <div style={{ padding: '0 20px', marginTop: '40px', fontSize: '14px' }}>
                    <Text strong style={{ marginRight: '4px' }}>当前展会:</Text>
                    <Tag color='blue'>第五届世界大健康博览会</Tag>
                    <Button size='small' icon='swap' onClick={this.onChangeExpo}>切换</Button>
                </div>
                <div style={{ padding: '0 20px', marginTop: '40px', fontSize: '14px' }}>

                    <Table columns={columns} dataSource={boothData}></Table>
                </div>


                <Modal
                    title="选择展会"
                    visible={this.state.showModel}
                    onOk={this.handleModelOk}
                    onCancel={this.handleModelCancel}
                >
                    内容
                </Modal>


            </div>
        )
    }
}

export default BoothList

