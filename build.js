import rollup from 'rollup'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'
import renderable from './lib/renderable.js'

const rollupBaseConfig = {
  output: {
    dir: 'payloads',
    format: 'iife'
  },
  plugins: [
    nodeResolve({
      mainFields: ['browser'],
      preferBuiltins: false,
      modulesOnly: false
    }),
    /* obfuscatorPlugin({ //Stubbed for later inclusion
        compact: true,
        target: 'browser',
        renameGlobals: true
    }), */
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**', // Default: undefined
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ], // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [ '.js' ], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false, // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      namedExports: { './module.js': [ 'foo', 'bar' ] }, // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      ignore: [ 'conditional-runtime-dependency' ]
    }),
    minify({
      sourceMap: false,
      comments: false
    })
  ]
}

export async function buildPayload (name) {
  // let config = Object.assign({ input: filename }, rollupBaseConfig)
  const bundle = await rollup.rollup({ input: `payload_src/${name}.js` })
  const { output } = await bundle.generate(rollupBaseConfig)
  console.log('output', output)
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.isAsset) {
      // For assets, this contains
      // {
      //   isAsset: true,                 // signifies that this is an asset
      //   fileName: string,              // the asset file name
      //   source: string | Buffer        // the asset source
      // }
      console.log('Asset', chunkOrAsset)
    } else {
      // For chunks, this contains
      // {
      //   code: string,                  // the generated JS code
      //   dynamicImports: string[],      // external modules imported dynamically by the chunk
      //   exports: string[],             // exported variable names
      //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
      //   fileName: string,              // the chunk file name
      //   imports: string[],             // external modules imported statically by the chunk
      //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
      //   isEntry: boolean,              // is this chunk a static entry point
      //   map: string | null,            // sourcemaps if present
      //   modules: {                     // information about the modules in this chunk
      //     [id: string]: {
      //       renderedExports: string[]; // exported variable names that were included
      //       removedExports: string[];  // exported variable names that were removed
      //       renderedLength: number;    // the length of the remaining code in this module
      //       originalLength: number;    // the original length of the code in this module
      //     };
      //   },
      //   name: string                   // the name of this chunk as used in naming patterns
      // }
      console.log('Chunk', chunkOrAsset.modules)
    }
  }
  await bundle.write(rollupBaseConfig)
}

export async function renderPayload (name) {
  // let config = Object.assign({ input: filename }, rollupBaseConfig)
  const bundle = await rollup.rollup({ input: `payload_src/${name}.js` })
  const { output } = await bundle.generate(rollupBaseConfig)
  return renderable(output[0].code)
}
