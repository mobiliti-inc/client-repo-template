const { shallowToJson } = require('enzyme-to-json');

export const matchSnapshot = (subject: any) => {
	expect(shallowToJson(subject)).toMatchSnapshot();
};
