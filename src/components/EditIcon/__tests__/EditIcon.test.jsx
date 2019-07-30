import EditIcon from '../EditIcon';


describe('EditIcon test', () => {
	it('renders', () => {
		const tree = shallow(<EditIcon />);
		matchSnapshot(tree);
	});
});
