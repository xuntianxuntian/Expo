import React from 'react'
import axios from 'axios'
import { Typography, Divider, Tag, Button, Modal, Table, Icon, Input } from 'antd'
import store from '../../../store'
import Highlighter from 'react-highlight-words';

class CompanyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            changeExpoModel: false,
            authCompanyModal:false,
            searchText: '',
            searchedColumn: '',
            
        }
    }

    componentDidMount() {
        localStorage.setItem('sideLocation', window.location.pathname.split('/')[2])
        store.dispatch({
            type: "TOOGLE_SIDERBAR",
            payload: "companyCheck"
        })
    }

    onChangeExpo = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            changeExpoModel: true
        })
    }
    onAuthCompany = (e,record) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            authCompanyModal: true
        })
    }

    handleModelCancel = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            changeExpoModel: false,
            authCompanyModal: false
        })
    }
    handleModelOk = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            changeExpoModel: false,
            authCompanyModal: false
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

    render() {



        const columns = [
            {
                title: '公司名称',
                dataIndex: 'cName',
                key: 'cName',
                ...this.getColumnSearchProps('cName', '公司名称'),
            },
            {
                title: '联系人',
                dataIndex: 'cManager',
                key: 'cManager',
            },
            {
                title: '联系电话',
                dataIndex: 'cTel',
                key: 'cTel',
                ...this.getColumnSearchProps('cTel', '联系电话'),
            },
            {
                title: '施工展位',
                dataIndex: 'cBooths',
                key: 'cBooths',
                ...this.getColumnSearchProps('cBooths', '展位号'),
                render: booths => {
                    if(booths){
                        return (
                            <span>
                                {booths.map(booth => (booth+', '))}
                            </span>
                        )
                    }
                }
            },
            {
                title: '是否指定',
                dataIndex: 'isVip',
                key: 'isVip',
            },
            {
                title: '认证资料',
                dataIndex: 'authentication',
                key: 'authentication',
                render: (text,record) => <a onClick={e => this.onAuthCompany(e,record)}>查 看</a>,
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
                cName: '武汉亚美空间展览服务有限公司',
                cManager: '张伟',
                cTel: '15236258457',
                cBooths: ['A1A22', 'B1B12','A1A22', 'B1B12','A1A22', 'B1B12','A1A22', 'B1B12'],
                isVip: '是',
                authentication: '无',
            },
            {
                key: '2',
                cName: '武汉多人行展览服务有限公司',
                cManager: '李亮',
                cTel: '13562536525',
                cBooths: ['C1C01'],
                isVip: '否',
                authentication: '无',
            },
            {
                key: '3',
                cName: '武汉汉展天地展览服务有限公司',
                cManager: '刘莹',
                cTel: '13966352244',
                cBooths: ['A5A23','B2B15'],
                isVip: '是',
                authentication: '无',
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
                    visible={this.state.changeExpoModel}
                    onOk={this.handleModelOk}
                    onCancel={this.handleModelCancel}
                >
                    内容
                </Modal>
                <Modal
                    title="资质审核"
                    visible={this.state.authCompanyModal}
                    onOk={this.handleModelOk}
                    onCancel={this.handleModelCancel}
                >
                    内容
                </Modal>


            </div>
        )
    }
}

export default CompanyList

