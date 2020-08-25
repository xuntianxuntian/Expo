import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Typography, Col, Row, Upload, Icon, Button, Cascader, message, Modal } from 'antd'
import axios from 'axios'
import isEmpty from '../../../../../utils/isEmpty';
import '../../../../../css/content/uploads.inlinestyle.css'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { switchToInfoTemp } from '../../../../../actions/changeBoothDesignTab.action'

import DesignInfoForm from './DesignInfoForm.component';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


class DesignUploads extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            unSubmitBooth: [],
            selectedBoothId: '',
            uploadDisabled: true,
            uploadList: {
                xgPic: { files: [], min: 4, max: 6 },
                ccPic: { files: [], min: 3, max: 5 },
                czPic: { files: [], min: 2, max: 4 },
                dlPic: { files: [], min: 2, max: 3 },
                aqPic: { files: [], min: 1, max: 4 },
                qtPic: { files: [], min: 1, max: 6 },
            }
        }
    }

    componentDidMount() {
        let unSubmitBooth = []
        JSON.parse(localStorage.boothList).forEach(booth => {
            if (!booth.auth || !booth.auth.booth || booth.auth.booth.status == 'uncommited' || (booth.auth.booth.err && booth.auth.booth.err.length)) {
                unSubmitBooth.push(booth)
            }
        })
        if (unSubmitBooth.length > 0) {
            this.setState({
                ...this.state,
                unSubmitBooth,
            })

        }
    }
    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if (this.props.bidtoBeUpdated && this.props.bidtoBeUpdated !== prevProps.bidtoBeUpdated) {
            this.setState(
                {
                    ...this.state,
                    selectedBoothId: this.props.bidtoBeUpdated,
                    uploadDisabled: false,
                }
            )
            // this.handleUpdateBooth(this.props.boothToBeUpdate)
        }
    }

    handleUpdateBooth = (bid) => {
        axios.get(`/api/user/booth/${bid}`).then(
            res => {
                console.log(res.data)
                if (res.status == 200) {
                    let b = res.data.booth
                    b.bName = res.data.booth.bName.fullName
                    this.state.unSubmitBooth.push(b)
                    this.setState(
                        {
                            ...this.state,
                            selectedBoothId: res.data.booth.bName
                        }
                    )
                }
            }
        ).catch(
            err => {
                message.error({ content: err.response.data, key: 'updateboothFailed' })
            }
        )
    }

    //获取子组件的表单信息 获取form控件
    getChildDesignInfo = (childComponent) => {
        this.child = childComponent
    }
    // booth selector onchange
    onBoothChange = value => {
        if (!isEmpty(value)) {
            this.setState({
                ...this.state,
                selectedBoothId: value[0],
                uploadDisabled: false,
            })
        } else {
            this.setState({
                ...this.state,
                selectedBoothId: '',
                uploadDisabled: true,
            })
        }

    }


    //提交审核  提交表单
    onHandleSubmitUploads = (e) => {
        // window.location = '/boothDesign'
        if (this.checkUploadContent()) {
            this.child.props.form.validateFieldsAndScroll((err, value) => {
                if (err) {
                    console.log('err')
                } else {
                    console.log(value)
                    axios.post('https://www.mocky.io/v2/5cc8019d300000980a055e76', { data: { formData: value, boothId: this.state.selectedBoothId } })
                        .then(res => {
                            if (res.status == 200) {
                                console.log(res.data)
                                message.success('提交成功')
                                let newBoothList = JSON.parse(localStorage.boothList)
                                newBoothList.forEach(booth => {
                                    if (this.state.selectedBoothId == booth.boothId) {
                                        booth.info = res.data
                                    } else {
                                        //好像什么都不用做
                                    }
                                })
                                localStorage.setItem('boothList', JSON.stringify(newBoothList))
                                window.location = '/boothDesign'
                            }
                        }).catch(err => {
                            console.log(err.response)
                        })
                }
            })
        }

    }

    //每个upload组件的change回调，作为检测每组上传控件的检测和判断函数

    onUploadChange = (info, field) => {
        if (info.file.status === 'done') {
            this.state.uploadList[field].files.push(info.file.name)
        }
    }

    //检测上传控件的上传结果  是否存在未上传或者上传未完成的控件
    checkUploadContent = () => {

        return true
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handlePreviewCancel = () => this.setState({ previewVisible: false });



    render() {
        console.log('render4')
        const { Text } = Typography
        const currentExpo = localStorage.currentExpo || '测试展会'

        //booth uploads item Title datasource
        const data = [
            {
                title: '效果图',
                field: 'xgPic'
            },
            {
                title: '尺寸图',
                field: 'ccPic'
            },
            {
                title: '材质图',
                field: 'czPic'
            },
            {
                title: '电器分布及用电规格',
                field: 'dlPic'
            },
            {
                title: '责任安全书',
                field: 'aqPic'
            },
            {
                title: '其他证件',
                field: 'qtPic'
            },
        ]

        //booth selector data source  将已经提交申请的展位添加到下拉菜单

        const options = this.state.unSubmitBooth.length > 0 ? this.state.unSubmitBooth.map(booth => {
            return {
                value: booth.bName,
                label: booth.bName
            }
        }) : []


        // List Items uploads props 上传控件的基本通用属性
        const props2 = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture',
            className: 'upload-list-inline-boothDesign',
            headers: {
                authorization: localStorage.token,
            },
            multiple: true,

        }


        console.log(this.state.unSubmitBooth)
        console.log(options)

        console.log('seletedId' + this.state.selectedBoothId)
        return (
            <div>
                <div>

                    <span style={{ fontSize: '14px' }}>选择展位: </span>
                    <Cascader
                        options={options}
                        value={[this.state.selectedBoothId]}
                        onChange={value => this.onBoothChange(value)}
                        placeholder={this.state.unSubmitBooth.length > 0 ? ' 选择展位号' : ' 请先添加展位!'}
                        disabled={this.state.unSubmitBooth.length > 0 ? false : true} />
                    <Link to='/booth' > 添加展位</Link>

                    <DesignInfoForm formDisabled={this.state.uploadDisabled} onRef={this.getChildDesignInfo} existedInfo={this.state.selectedBoothId} />
                    <div style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', marginTop: '20px', padding: '20px 0 10px 10px' }}>
                        <Typography style={{ paddingTop: '20px', paddingLeft: '15px' }}>
                            <Text strong style={{ fontSize: '16px' }} >| 上传展位设计图:</Text>
                        </Typography>
                        <div style={{ padding: '10px 40px' }}>
                            <List
                                size='small'
                                style={{ paddingBottom: '20px' }}
                                itemLayout="horizontal"
                                dataSource={data}

                                renderItem={item => (
                                    <List.Item
                                        extra={
                                            <img
                                                width={120}
                                                alt="logo"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                            />
                                        }
                                    >
                                        <List.Item.Meta
                                            title={<Text >{item.title}</Text>}
                                            description={
                                                <Upload {...props2}
                                                    name={item.field}
                                                    onPreview={this.handlePreview}
                                                    onChange={(info) => this.onUploadChange(info, item.field)}
                                                    beforeUpload={(file, fileList) => {
                                                        file.fieldName = item.field
                                                        const oldFiles = this.state.uploadList[item.field].files.concat()
                                                        const newFiles = oldFiles.concat(file.name)
                                                        let newUploadItem = {}
                                                        newUploadItem[file.fieldName] = {}
                                                        newUploadItem[file.fieldName].max = this.state.uploadList[item.field].max
                                                        newUploadItem[file.fieldName].max = this.state.uploadList[item.field].min
                                                        newUploadItem[file.fieldName].files = newFiles
                                                        this.setState({
                                                            ...this.state,
                                                            uploadList: {
                                                                ...this.state.uploadList,
                                                                newUploadItem
                                                            }
                                                        })
                                                        console.log(this.state.uploadList)
                                                        if (file.size > 10 * 1024 * 1024) {
                                                            message.error('上传的图片大小不能超过2M!')
                                                            return false
                                                        } //超过2M不上传
                                                        else if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
                                                            message.error('请上传jpeg|gif|jpg|png格式的图片!')
                                                            return false
                                                        } else if (newUploadItem[file.fieldName].files.length > this.state.uploadList[item.field].max) {
                                                            message.error(`${item.title}要求不能超过${this.state.uploadList[item.field].max}`)
                                                            return false
                                                        }
                                                        console.log(file)
                                                        return true
                                                    }}
                                                    style={{ width: '100%' }}>
                                                    <Button disabled={this.state.uploadDisabled}>
                                                        <Icon type="upload" /> 上传文件
                                                </Button>
                                                </Upload>
                                            }
                                        />
                                    </List.Item>
                                )} />
                        </div>
                    </div>
                </div>
                <Button
                    type='primary'
                    style={{ float: 'right', marginTop: '15px', marginBottom: '50px' }}
                    onClick={e => this.onHandleSubmitUploads(e)}>
                    提交审核</Button>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handlePreviewCancel} className="picModel">
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    boothList: state.boothList,
    bidtoBeUpdated:state.bidFromList
})

DesignUploads.propTypes = {
    boothList: PropTypes.array.isRequired,
    switchToInfoTemp: PropTypes.func.isRequired,
    bidtoBeUpdated:PropTypes.string.isRequired,
}

export default connect(mapStateToProps, { switchToInfoTemp })(DesignUploads)


