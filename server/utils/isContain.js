
module.exports.keepChar = (str) =>{
    if(typeof str === 'string'){
        const regex = /[^\u4e00-\u9fa5\w]/g
        str1 = str.replace(regex,"")
        str2 = str1.replace('_',"")

        return str2
    }else{

        return str
    }
}


module.exports.isContain = (value,searchValue) => {
    const regex = new RegExp(searchValue,'i')
    return regex.test(value)
}
