import React, { Component } from 'react'
import { Upload, message, Button, Icon, Progress, Modal, Typography } from 'antd'
import axios from 'axios'


//  自定义组件应该定义的props  
// <CustomUploads
//     // style={{ display: 'inline-block' }}
//     startUploading={this.state.startUploading}
//     uploadUrl='api/uploads/qualification'
//     fileName='constructionImg'
//     previewStyle='text'
//     previewClassName='upload-list-inline-qualification'
//     isMultiple={true}
// />

class CustomUploads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImage: '',
            previewVisible: false,
            isUploading: false,
            uploadPercentage: 0,
            showProgress: false,
            progressStatus: 'normal',
            fileList: [],
            addedFileNameList: []
        }
    }

    componentDidMount() {
        // console.log('comPonentWillUpdate')
        // console.log(this.state.fileList)
    }


    handlePreview = (file) => {
        this.setState({
            previewImage: file.thumbUrl,
            previewVisible: true,
        })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handleRemove = (removeFile) => {
        let removedFileList = []
        this.state.fileList.forEach(file => {
            if (file.uid === removeFile.uid) {
                //do nothing
            } else {
                removedFileList.push(file)
            }
        })
        this.setState({
            fileList: removedFileList
        })
        return true
    }

    render() {

        //初始化组件props参数  并设置初始值
        const fileNameFromProps = this.props.fileName //required 必须附带参数 没有默认值
        const uploadUrlFromProps = this.props.uploadUrl //required 必须附带参数 没有默认值
        const previewStyleFromProps = this.props.previewStyle || 'text' //默认值text样式
        const classNameFromProps = this.props.previewClassName || 'upload-list-inline-default'
        const multipleFromProps = this.props.isMultiple || false

        const { Text } = Typography
        const fileNameList = this.state.addedFileNameList.map((fileName, index) => {
            return (<Text ellipsis code key={index} style={{ width: '15%', display: 'inline-block' }}> {fileName} </Text>)
        })

        const ProgressBar = this.state.showProgress ? <Progress
            percent={this.state.uploadPercentage}
            size="small"
            strokeWidth={3}
            showInfo={this.state.showProgress}
            status={this.state.progressStatus}
        /> : ''

        let that = this
        const customProps = {
            listType: previewStyleFromProps,
            className: classNameFromProps,
            multiple: multipleFromProps,
            onStart(file) {
                // that.state.fileList.push(file)
            },
            onSuccess(ret, file) {
                that.setState({
                    ...that.state,
                    progressStatus: 'success'
                })
            },
            onError(err) {
                that.setState({
                    ...that.state,
                    progressStatus: 'exception'
                })
                console.log('onError', err);
            },
            onProgress(percent, file) {
                that.setState({
                    ...that.state,
                    uploadPercentage: Number(percent),
                    progressStatus: 'active'
                })
            },
            customRequest({
                action,
                data,
                file,
                filename,
                onProgress,
                onSuccess,
                onError
            }) {
                // EXAMPLE: post form-data with 'axios'
                const formData = new FormData();
                // if (data) {
                //   Object.keys(data).forEach(key => {
                //     formData.append(key, data[key]);
                //   });
                // }
                formData.append(filename, file);

                axios
                    .post(uploadUrlFromProps, formData, {
                        onUploadProgress: ({ total, loaded }) => {
                            onProgress(Math.round(loaded / total * 100).toFixed(2), file);
                        },
                    })
                    .then((res) => {
                        onSuccess(res, file);
                    })
                    .catch(err => onError(err));

                return {
                    abort() {
                        console.log('upload progress is aborted.')
                    },
                };
            },
            headers: {
                authorization: localStorage.token,
            },
            beforeUpload(file, fileList) {
                let addedFIles = []
                console.log('fileList')
                console.log(fileList)
                that.setState({
                    ...that.state,
                    // progressStatus: 'normal',
                    uploadPercentage: 0,
                })
                that.state.addedFileNameList.push(file.name)
                if (that.state.fileList.length === 0 && fileList.length == 1) {
                    const r = new FileReader()
                    r.readAsDataURL(file)
                    r.onload = e => {
                        file.thumbUrl = e.target.result
                        addedFIles.push(file)
                        that.setState({
                            ...that.state,
                            fileList: addedFIles
                        })
                    }
                } else if (fileList.length > 1) {
                    addedFIles = that.state.fileList
                    const r = new FileReader()
                    r.readAsDataURL(file)
                    r.onload = e => {
                        file.thumbUrl = e.target.result
                        addedFIles.push(file)
                    }
                    that.setState({
                        ...that.state,
                        fileList: addedFIles
                    })
                }
                else {
                    addedFIles = that.state.fileList
                    const r = new FileReader()
                    r.readAsDataURL(file)
                    r.onload = e => {
                        file.thumbUrl = e.target.result
                        addedFIles.push(file)
                        that.setState({
                            ...that.state,
                            fileList: addedFIles
                        })
                    }
                }

                if (fileList.length > 0) {
                    that.setState({
                        ...that.state,
                        showProgress: true
                    })
                    return true
                } return false
            },
        }


        return (
            <div>
                <Upload {...customProps}
                    fileList={this.state.fileList}
                    onPreview={(file) => this.handlePreview(file)}
                    onRemove={file => this.handleRemove(file)}
                    name={fileNameFromProps}
                >
                    <Button>
                        <Icon type="upload" />上传文件
                    </Button>
                    <br />
                    <div style={{width:'100%'}}>
                        {fileNameList}
                    </div>
                </Upload>
                {ProgressBar}
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="预览" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        )
    }
}

export default CustomUploads