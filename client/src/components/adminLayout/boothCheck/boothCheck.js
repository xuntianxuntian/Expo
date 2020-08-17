import React from 'react'
import axios from 'axios'
import { Typography, Divider, Tag, Button, Modal, Table, Icon, Input ,Tabs} from 'antd'
import store from '../../../store'
import Highlighter from 'react-highlight-words';

class BoothCheck extends React.Component {
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
            payload: "boothCheck"
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
    getColumnSearchProps = (dataIndex, title) => ({
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

    onTabChange = (key) => {
        console.log(key)
    }
    render() {

        const { TabPane } = Tabs

        const columns1 = [
            {
                title: '展位号',
                dataIndex: 'boothId',
                key: 'boothId',
                ...this.getColumnSearchProps('boothId', '展位号'),
            },
            {
                title: '展位名称',
                dataIndex: 'boothName',
                key: 'boothName',
                ...this.getColumnSearchProps('boothName', '展位名称'),
            },
            {
                title: '展位面积',
                dataIndex: 'boothSize',
                key: 'boothSize',

            },
            {
                title: '申请时间',
                dataIndex: 'requestDate',
                key: 'requestDate',
            },
            {
                title: '',
                key: 'action',
                render: text => <a>审核</a>,
            },
        ];

        const boothData1 = [
            {
                key: '1',
                boothId: 'A2B01',
                boothName: '中国绿地控股有限公司',
                boothSize: 36,
                requestDate: '2017-10-16',
                
            },
            {
                key: '2',
                boothId: 'A1A05',
                boothName: '中国航天制造有限公司',
                boothSize: 36,
                requestDate: '2014-10-26',
            },
            {
                key: '3',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '4',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '5',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '6',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '7',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '8',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '9',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '10',
                boothId: 'C1C20',
                boothName: '中国多人行',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '11',
                boothId: 'gggg',
                boothName: 'fffff',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '12',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },
            {
                key: '13',
                boothId: 'A2A11',
                boothName: '中国重工',
                boothSize: 36,
                requestDate: '2017-8-21',
            },

        ];


        const { Paragraph, Text, Title } = Typography

        return (
            <div style={{backgroundColor:'white',paddingBottom:'20px'}}>
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
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab="审核" key="1">
                            审核页
                        </TabPane>
                        <TabPane tab="未审核展位" key="2">
                            <Table columns={columns1} dataSource={boothData1}></Table>
                        </TabPane>
                        <TabPane tab="已通过展位" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="未通过展位" key="4">
                            Content of Tab Pane 4
                        </TabPane>
                    </Tabs>
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

export default BoothCheck

