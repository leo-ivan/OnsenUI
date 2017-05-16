const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

module.exports = {
  entry: './src/index', // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, 'dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: 'react-onsenui.js', // string
    // the filename template for entry chunks

    // publicPath: '/assets/', // string
    // the url to the output directory resolved relative to the HTML page

    library: 'Ons', // string,
    // the name of the exported library

    libraryTarget: 'umd', // universal module definition
    // the type of the exported library
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.js$|\.jsx$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          // path.resolve(__dirname, 'app/demo-files')
        ],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        loader: 'babel-loader',
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ['env', 'stage-3', 'react'],
          babelrc: false
        }
        // options for the loader
      }
    ]
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
    ],
    // directories where to look for modules

    extensions: ['.js', '.jsx']
    // extensions that are used
  },

  devtool: 'cheap-module-source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  externals: {
    'react': { // UMD
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': { // UMD
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    },
    'onsenui': { // UMD
      commonjs: 'onsenui',
      commonjs2: 'onsenui',
      amd: 'onsenui',
      root: 'ons'
    }
  },
  // Don't follow/bundle these modules, but request them at runtime from the environment

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'production'` // removes dead code
    }),
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version} - ${new Date()}`)
  ]
  // list of additional plugins
};