const Validator = require('validator')

module.exports = validateLoginData = userData => {
    let { email, password } = userData
    email = email === undefined ? '' : email
    password = password === undefined ? '' : password

    let isValid = false
    let errors = {}



    if (!Validator.isEmail(email)) {
        errors.email = "请输入正确的邮箱地址"
    }

    if (Validator.isEmpty(email)) {
        errors.email = "请输入邮箱"
    }

    if (Validator.isEmpty(password)) {
        errors.password = "请输入密码"
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