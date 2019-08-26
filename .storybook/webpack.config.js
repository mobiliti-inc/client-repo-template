module.exports = ({ config }) => {
	config.module.rules.push(
		{
			test: /\.(ts|js)x?$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "babel-loader"
				},
				// Optional
				{
					loader: require.resolve("react-docgen-typescript-loader")
				}
			]
		},
		{
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		},
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
					loader: "sass-loader",
					options: {
						sourceMap: true
					}
				}
			]
		}
	);
	config.resolve.extensions.push(".ts", ".tsx");
	return config;
};
