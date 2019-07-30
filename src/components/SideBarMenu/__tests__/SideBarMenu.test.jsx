import SideBarMenu from '../SideBarMenu';
import sideMenuContentData from '../../../pages/Profile/common/sideMenuContentData';


describe('SideBarMenu', () => {
	const defaultProps = {
		history: jest.fn(),
		menuContent: sideMenuContentData,
	};
	it('renders', () => {
		const tree = shallow(<SideBarMenu {...defaultProps} />);
		matchSnapshot(tree);
	});
});
