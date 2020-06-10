
const isEmpty = (value)=>{
    if(typeof value === 'string'  &&  value === 'undefined') return true
    if(typeof value === 'string'  &&  value.length > 0) return false
    if(typeof value === 'object' && Object.keys(value).length > 0) return false
    if(value === undefined || value === null || value === '' || value === 0) return true
    return true
}

export default isEmpty 