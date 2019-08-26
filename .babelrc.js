const presets = ["@babel/preset-env", "@babel/typescript", "@babel/react"];
const plugins = [
	["@babel/plugin-proposal-decorators", { legacy: true }],
	["@babel/plugin-proposal-class-properties", { loose: true }],
	"@babel/proposal-object-rest-spread",
	[
		"babel-plugin-react-css-modules",
		{
			generateScopedName: "[name]__[local]--[hash:base64:5]",
			filetypes: {
				".scss": {
					syntax: "postcss-scss",
					plugins: ["postcss-nested"]
				},
				".sass": { syntax: "postcss-sass" }
			}
		}
	]
];

if (process.env["ENV"] === "test") {
	// Remove the last value which should be babel-plugin-react-css-modules
	plugins.pop();
	// Push this config which makes testing classnames as they should be thus smoothing testing
	plugins.push([
		"babel-plugin-react-css-modules",
		{
			generateScopedName: "[local]",
			filetypes: {
				".scss": {
					syntax: "postcss-scss",
					plugins: ["postcss-nested"]
				},
				".sass": { syntax: "postcss-sass" }
			}
		}
	]);
}

module.exports = { presets, plugins };
