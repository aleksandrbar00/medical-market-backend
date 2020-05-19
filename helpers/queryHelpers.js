function getQueryParam(queryString, character, isNumber){
    let splittedArr = []
    if(queryString){
        if(!isNumber){
            isNumber = false
        }
        if(isNumber){
            splittedArr = queryString.split(character).map(item => parseInt(item))
        }else{
            splittedArr = queryString.split(character)
        }
    }

    return splittedArr
}

module.exports = {
    getQueryParam
}
