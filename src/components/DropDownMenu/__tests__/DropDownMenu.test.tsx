import DropDownMenu from '../DropDownMenu';


describe('DropDownMenu', () => {
	it('renders', () => {
		const tree = shallow(<DropDownMenu />);
		matchSnapshot(tree);
	});

	it('renders with splitted left content container', () => {
		const tree = shallow(<DropDownMenu leftContentIsSplitted />);
		matchSnapshot(tree);
	});

	it('updates isDroppedDown state correctly when handleClick method is called', () => {
		const tree = shallow(
			<DropDownMenu />);
		expect(tree.instance().state.isDroppedDown).toEqual(false);
		tree.instance().handleClick();
		expect(tree.instance().state.isDroppedDown).toEqual(true);
	});

	it('updates DropDownClass correctly when isDroppedDown props change', () => {
		const tree = shallow(
			<DropDownMenu />);
		expect(tree.instance().state.isDroppedDown).toEqual(false);
		expect(tree.find('.dropdown-menu-modal-open').length).toEqual(0);
		tree.setProps({
			isDroppedDown: false
		});
		expect(tree.instance().state.isDroppedDown).toEqual(false);
		expect(tree.find('.dropdown-menu-modal-open').length).toEqual(0);
		tree.setProps({
			isDroppedDown: true
		});
		expect(tree.find('.dropdown-menu-modal-open').length).toEqual(1);
	});

	it('updates LeftContentcontainerClass correctly when isContentCompleted props change', () => {
		const tree = shallow(
			<DropDownMenu />);
		expect(tree.instance().state.isContentCompleted).toEqual(false);
		expect(tree.find('.left-content-container-selected').length).toEqual(0);
		tree.setProps({
			isContentCompleted: false
		});
		expect(tree.instance().state.isContentCompleted).toEqual(false);
		expect(tree.find('.left-content-container-selected').length).toEqual(0);
		tree.setProps({
			isContentCompleted: true
		});
		expect(tree.find('.left-content-container-selected').length).toEqual(1);
	});
});
