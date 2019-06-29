const { toPairs } = require('lodash/fp/object')

module.exports = function(template) {
    return function(data) {
        return toPairs(data).reduce((rendered, param) => {
            return recursiveReplace(rendered, `$$${param[0]}$$`, param[1])
        }, template)
    }
}

function recursiveReplace(input, target, replaceWith) {
    const output = input.replace(target, replaceWith)
    return input === output ? output : recursiveReplace(output, target, replaceWith)
}