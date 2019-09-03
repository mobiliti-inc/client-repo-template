const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pxToRem = require("postcss-pxtorem");

const { API_ENDPOINTS } = require("./api");

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, "src");
const BUILD_PATH = path.resolve(ROOT_PATH, "dist");

const common = {
	// webpack will take the files from ./src/index
	entry: path.resolve(APP_PATH, "index"),

	// and output it into /dist as bundle.js
	output: {
		path: BUILD_PATH,
		filename: "[name].bundle.js",
		chunkFilename: "[name].[hash].js"
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	// adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
		alias: {
			variables: path.resolve(__dirname, "./src/styles/_variables.scss")
		}
	},

	module: {
		rules: [
			// we use babel-loader to load our jsx and tsx files
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: [
					"css-modules-typescript-loader",
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	]
};

const development = {
	mode: "development",
	devServer: {
		inline: true,
		host: "0.0.0.0",
		port: "80",
		hot: true,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-modules-typescript-loader"
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: "[name]__[local]--[hash:base64:5]"
							},
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							plugins() {
								return [autoprefixer("last 2 version"), pxToRem()];
							}
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				api_url: JSON.stringify(API_ENDPOINTS.MOCK_API)
			}
		})
	]
};

const production = {
	mode: "production",
	output: {
		path: BUILD_PATH,
		filename: "[name].[hash].js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-modules-typescript-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: false,
							importLoaders: 1,
							modules: {
								localIdentName: "[name]__[local]--[hash:base64:5]"
							}
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: false,
							plugins() {
								return [autoprefixer("last 2 version"), pxToRem()];
							}
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css"
		}),
		new webpack.DefinePlugin({
			"process.env": {
				api_url: JSON.stringify(API_ENDPOINTS.PRODUCTION_API)
			}
		})
	]
};

if (TARGET === "start" || !TARGET) {
	module.exports = merge.smart(common, development);
}

if (TARGET === "build-staging") {
	module.exports = merge.smart(common, development);
}

if (TARGET === "build-prod") {
	module.exports = merge.smart(common, production);
}
