const Validator = require('validator')

module.exports = validateLoginData = userData => {
    let { email, password } = userData
    email = email === undefined ? '' : email
    password = password === undefined ? '' : password

    let isValid = false
    let errors = {}



    if (!Validator.isEmail(email)) {
        errors.email = "邮箱不合法"
    }

    if (Validator.isEmpty(email)) {
        errors.email = "邮箱不能为空"
    }

    if (Validator.isEmpty(password)) {
        errors.password = "密码不能为空"
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