const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dev = process.env.NODE_ENV === 'dev';

const path = require('path');

let cssloaders = [MiniCssExtractPlugin.loader, 'css-loader'];

let config = {
  entry: {
    app: './src/index.js'
  },
  mode: dev ? 'development' : 'production',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssloaders
      },
      {
        test: /\.scss$/,
        use: [...cssloaders, 'sass-loader']
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  })],
  optimization: {
    minimize: false,
    minimizer: []
  }
};

if (!dev) {
  config.optimization.minimize = true;
  config.optimization.minimizer.push(new TerserPlugin());
  config.optimization.minimizer.push(new CssMinimizerPlugin());
}

module.exports = config;