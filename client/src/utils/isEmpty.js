
const isEmpty = (value)=>{
    if(value === undefined || value === null || value === '' || value === 0) return true
    if(typeof value === 'object' && Object.keys(value).length > 0) return false
    return true
}

export default isEmpty 