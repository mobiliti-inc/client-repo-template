const React = require("react");
// const CSSModules = require("react-css-modules");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

const { shallow, render, mount } = Enzyme;

Enzyme.configure({ adapter: new Adapter() });
jest.setTimeout(30000);

global.React = React;
// global.CSSModules = CSSModules;
global.shallow = shallow;
global.render = render;
global.mount = mount;
