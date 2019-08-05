import PhotoRecBox from '../PhotoRecBox';

describe('PhotoRecBox', () => {
	it('renders with box icon', () => {
		const tree = shallow(
			<PhotoRecBox
				onBoxClick={() => { }}
				boxIcon="test icon"
			/>);
		matchSnapshot(tree);
	});


	it('renders with box image', () => {
		const tree = shallow(
			<PhotoRecBox
				onBoxClick={() => { }}
				boxImage="test image"
			/>);
		matchSnapshot(tree);
	});


	it('renders horizontally when isVertical is set to false', () => {
		const tree = shallow(
			<PhotoRecBox
				onBoxClick={() => { }}
				boxIcon="test icon"
				isVertical={false}
			/>);
		matchSnapshot(tree);
	});

	it('renders with box title if box title is defined', () => {
		const tree = shallow(
			<PhotoRecBox
				onBoxClick={() => { }}
				boxIcon="test icon"
				isVertical={false}
				boxTitle="test title"
			/>);
		matchSnapshot(tree);
	});

	it('renders with box description if box description is defined', () => {
		const tree = shallow(
			<PhotoRecBox
				onBoxClick={() => { }}
				boxIcon="test icon"
				isVertical={false}
				boxDescription="test description"
			/>);
		matchSnapshot(tree);
	});
});
