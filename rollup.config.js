import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const base = {
  input: 'src/index.js',
  output: {
    name: 'VueSmartcaptcha',
    format: 'umd',
    file: 'dist/vue-smartcaptcha.js',
    exports: 'default'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false, loose: true }]],
      plugins: [['@babel/plugin-proposal-object-rest-spread', { loose: true }]],
      exclude: 'node_modules/**'
    })
  ]
}

const minify = {
  ...base,
  output: {
    ...base.output,
    format: 'umd',
    file: 'dist/vue-smartcaptcha.min.js'
  },
  plugins: [...base.plugins, terser()]
}

const es = {
  ...base,
  output: {
    ...base.output,
    format: 'es',
    file: 'dist/vue-smartcaptcha.es.js'
  }
}

export default [base, minify, es]
