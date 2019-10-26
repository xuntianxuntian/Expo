const Validator = require('validator')

module.exports = validateRegisterData = userData => {
    let { email, password, password2,username,tel,company,captcha } = userData
    email = email === undefined ? '' : email
    password = password === undefined ? '' : password
    password2 = password2 === undefined ? '' : password2
    username = username === undefined ? '' : username

    const passwordReg = /^(\w){6,20}$/
    const telReg = /^1(3|4|5|6|7|8|9)\d{9}$/

    const isEmptyValue = require('./isEmpty')
    let isValid = false
    let errors = {}

    //检测合法性  

    if (!Validator.isEmail(email)) {
        errors.email = "邮箱不合法"
    }
    if (!Validator.isLength(password, { min: 6, max: 20 })) {
        errors.password = "密码不能少于6位，不能超过20位"
    }

    if(passwordReg.exec(password) === null ){
        errors.password = "密码只能由6-20位的数字、大小写字母组成"
    }

    if(telReg.exec(tel) === null ){
        errors.tel = "请输入正确的手机号码"
    }
    // if (!Validator.isLength(username, { min: 2, max: 40 })) {
    //     errors.username = "用户名不能少于2位，不能超过40位"
    // }

    if (!Validator.equals(password2, password)) {
        errors.password2 = "两次密码不一致"
    }
    if (Validator.isEmpty(email)) {
        errors.email = "请输入邮箱"
    }

    //检测是否为空

    if (Validator.isEmpty(password)) {
        errors.password = "请输入密码"
    }


    // if (Validator.isEmpty(username)) {
    //     errors.username = "请输入你的名字"
    // }

    if (Validator.isEmpty(password2)) {
        errors.password2 = "请输入确认密码"
    }

    if (isEmptyValue(tel)) {
        errors.tel = "请输入电话号码"
    }

    

    if (isEmptyValue(company)) {
        errors.company = "请输入公司全称"
    }
    if (isEmptyValue(captcha)) {
        errors.captcha = "请输入验证码"
    }


    if (JSON.stringify(errors) === "{}") {
        isValid = true
    } else {
        isValid = false
    }


    return {
        isValid,
        errors
    }
}