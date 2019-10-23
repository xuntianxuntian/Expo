const Validator = require('validator')

module.exports = validateRegisterData = userData => {
    let { email, password, password2,username } = userData
    email = email === undefined ? '' : email
    password = password === undefined ? '' : password
    password2 = password2 === undefined ? '' : password2
    username = username === undefined ? '' : username
    const passwordReg = /^(\w){6,20}$/

    let isValid = false
    let errors = {}


    if (!Validator.isEmail(email)) {
        errors.email = "邮箱不合法"
    }

    if (Validator.isEmpty(email)) {
        errors.email = "邮箱不能为空"
    }

    
    if (!Validator.isLength(password, { min: 6, max: 20 })) {
        errors.password = "密码不能少于6位，不能超过20位"
    }

    //正则检测密码的合法性
    if(passwordReg.exec(password) === null ){
        errors.password = "密码只能由6-20位的数字、大小写字母组成"
    }

    if (Validator.isEmpty(password)) {
        errors.password = "密码不能为空"
    }

    if (!Validator.isLength(username, { min: 2, max: 40 })) {
        errors.username = "用户名不能少于2位，不能超过40位"
    }

    if (Validator.isEmpty(username)) {
        errors.username = "用户名不能为空"
    }


    if (!Validator.equals(password2, password)) {
        errors.password2 = "密码不一致"
    }

    if (Validator.isEmpty(password2)) {
        errors.password2 = "确认密码不能为空"
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