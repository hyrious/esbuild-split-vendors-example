let esbuild = require('esbuild')
let pkg = require('./package.json')

let external = Object.keys(pkg.dependencies)

let header = `(() => {
    window.__esbuild_vendors__ = window.__esbuild_vendors__ || {};
    function require(key) { return window.__esbuild_vendors__[key] };`

let footer = `})();`

let vendor = `window.__esbuild_vendors__ = window.__esbuild_vendors__ || {};
${external.map(key => {
    return `window.__esbuild_vendors__['${key}'] = require('${key}');`
}).join('\n')}
`

esbuild.build({
    entryPoints: ['main.jsx'],
    bundle: true,
    outfile: 'dist/main.js',
    external,
    banner: { js: header },
    footer: { js: footer },
    logLevel: 'info',
    sourcemap: true,
}).catch(() => process.exit(1))

esbuild.build({
    stdin: {
        contents: vendor,
        resolveDir: __dirname
    },
    bundle: true,
    minify: true,
    outfile: 'dist/vendor.js',
    logLevel: 'info',
    sourcemap: true,
}).catch(() => process.exit(1))

