const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "js/[name].[chunkhash].js",
		assetModuleFilename: "img/[hash][ext][query]",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								exportLocalsConvention: "camelCase",
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[chunkhash].css",
			chunkFilename: "[id].css",
		}),
		new Dotenv({
			path: "./prod.env",
		}),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'all',
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					enforce: true,
				},
			},
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
});