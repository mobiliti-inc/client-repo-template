const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxToRem = require('postcss-pxtorem');
module.exports = {

	// webpack will take the files from ./src/index
	entry: './src/index',

	// and output it into /dist as bundle.js
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},

	// adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
		alias: {
			variables: path.resolve(__dirname, './src/styles/_variables.scss')
		}
	},

	module: {
		rules: [

			// we use babel-loader to load our jsx and tsx files
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				},
			},
			{
				test: /\.scss$/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: "css-modules-typescript-loader"
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins() {
								return [
									autoprefixer('last 2 version'),
									pxToRem()
								];
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}

		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};