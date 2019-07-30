import PhotoCapture from '../PhotoCapture';

describe('PhotoCapture', () => {
	const initialProps = {
		modalIsVisible: false,
		onCameraAccessFail: jest.fn(),
		handleCapturedPhoto: jest.fn(),
		handleModalVisibility: jest.fn(),
	};

	const component = <PhotoCapture {...initialProps} />;
	it('should render', () => {
		expect(component).toMatchSnapshot();
	});

	it('should call handleUploadUserProfilePhoto and handleTakePhotoModalVisibility when onUsePhoto method is called', () => {
		const tree = shallow(component);
		tree.instance().handleTakePhotoModalVisibility = jest.fn();
		tree.instance().onUsePhoto('mock image');
		expect(tree.instance().handleTakePhotoModalVisibility).toHaveBeenCalled();
		expect(tree.instance().props.handleCapturedPhoto).toHaveBeenCalled();
	});

	it('should update isPhotoModalVisible correctly when handlePhotoDialogModalVisibility method is called', () => {
		const tree = shallow(component);
		expect(tree.state('isPhotoModalVisible')).toEqual(false);
		tree.setProps({ modalIsVisible: true });
		tree.instance().handlePhotoDialogModalVisibility(true);
		expect(tree.state('isPhotoModalVisible')).toEqual(true);
	});

	it('should update isTakePhotoModalVisible correctly when handleTakePhotoModalVisibility method is called', () => {
		const tree = shallow(component);
		expect(tree.instance().state.isTakePhotoModalVisible).toEqual(false);
		tree.instance().handleTakePhotoModalVisibility(true);
		expect(tree.instance().state.isTakePhotoModalVisible).toEqual(true);
	});
});
