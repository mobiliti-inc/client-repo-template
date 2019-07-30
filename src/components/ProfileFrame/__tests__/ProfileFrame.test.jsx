import ProfileFrame from '../ProfileFrame';


const defaultProps = {
	profilePhoto: 'fake photo',
	uploadUserProfilePhoto: jest.fn(),
};
const component = <ProfileFrame {...defaultProps} />;

describe('ProfileFrame component', () => {
	it('should render', () => {
		const tree = shallow(component);
		matchSnapshot(tree);
	});
});
