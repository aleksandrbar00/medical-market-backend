const {v4: uuidv4} = require('uuid')
function generateName(userId){
    return `${userId}-photo-${uuidv4()}`
}

module.exports = {
    generateName
}
