module.exports = function(filename) {
    const file = require('fs').readFileSync(filename, 'utf8')
    return file
}
