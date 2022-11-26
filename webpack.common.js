const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
	context: path.resolve(__dirname, "./src"),
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
	},
	entry: {
		app: "./index.tsx",
	},
	output: {
		filename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: "asset/resource",
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
			{
				test: /\.html$/,
				loader: "html-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html",
			scriptLoading: "blocking",
		}),
		new CleanWebpackPlugin(),
	],
};