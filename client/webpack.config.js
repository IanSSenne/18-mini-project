const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const path = require("path");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
	return {
		mode: "development",
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
			cards: "./src/js/cards.js",
		},

		// TODO: Add the correct output
		output: {
			// output files to the dist folder as xxxxYYYY.bundle.js
			filename: "[name].bundle.js",
			path: resolve(__dirname, "dist"),
		},

		// TODO: Add the correct plugins
		plugins: [
			// create a service worker
			new InjectManifest({
				swSrc: "./src-sw.js",
				// more configuration here.
			}),
			new HtmlWebpackPlugin(),
			new MiniCssExtractPlugin(),
		],

		// TODO: Add the correct modules
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
							],
						},
					},
				},
			],
		},
	};
};
