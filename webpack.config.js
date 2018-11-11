const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      historyApiFallback: true,
      inline: true,
      port: 8080
   },
   module: {
      rules: [
        {
            exclude: /node_modules/,
            test: /\.js/,
            use: [
              { loader: 'babel-loader' }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader', options: {
                  includePaths: ['./node_modules', './node_modules/grommet/node_modules']
                }
              }
            ]
          },
          {
            test: /\.(jpg|png)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[path][name].[hash].[ext]",
              },
            },
          },
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}