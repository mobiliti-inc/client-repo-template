module.exports = {
	clearMocks: true,
	coverageDirectory: "coverage",
	setupFiles: ["raf/polyfill"],
	setupFilesAfterEnv: ["./testUtils/setupTestFrameworkScript.js"],
	snapshotSerializers: ["enzyme-to-json/serializer"],
	moduleNameMapper: {
		"\\.(s?css|less)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$":
			"<rootDir>/testUtils/fileMock.js"
	},
	testRegex: "/__tests__/.*(.test.|.spec.)tsx?$",
	coverageReporters: ["text", "html"],
	transform: {
		"^.+\\.tsx?$": "babel-jest"
	}
};
