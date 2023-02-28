const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const path = require("path");
const { GenerateSW } = require("workbox-webpack-plugin");
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
			filename: "[name].bundle.js",
			path: resolve(__dirname, "dist"),
		},

		// TODO: Add the correct plugins
		plugins: [
			new GenerateSW({
				// more configuration here.
			}),
			new HtmlWebpackPlugin(),
		],

		// TODO: Add the correct modules
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
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
