import ImageHolder from '../ImageHolder';


describe('ImageHolder', () => {
	const defaultProps = {
		onUploadImageClick: jest.fn(),
		onUploadImageInputChange: jest.fn(),
		imagefile: ''
	};
	it('renders', () => {
		const tree = shallow(<ImageHolder {...defaultProps} />);
		matchSnapshot(tree);
	});
});
