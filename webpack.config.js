const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FB_API_KEY': JSON.stringify(process.env.FB_API_KEY),
        'process.env.FB_AUTH_DOMAIN': JSON.stringify(
          process.env.FB_AUTH_DOMAIN
        ),
        'process.env.FB_DATABASE_URL': JSON.stringify(
          process.env.FB_DATABASE_URL
        ),
        'process.env.FB_PROJECT_ID': JSON.stringify(process.env.FB_PROJECT_ID),
        'process.env.FB_STORAGE_BUCKET': JSON.stringify(
          process.env.FB_STORAGE_BUCKET
        ),
        'process.env.FB_MESSAGING_SENDER_ID': JSON.stringify(
          process.env.FB_MESSAGING_SENDER_ID
        )
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
