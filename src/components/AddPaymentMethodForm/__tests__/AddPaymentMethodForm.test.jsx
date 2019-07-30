import AddPaymentMethodForm from '../AddPaymentMethodForm';


describe('AddPaymentMethodForm', () => {
	const initialProps = {
		onFormValidCheck: jest.fn(),
		addPaymentCard: jest.fn(),
		cancelForm: jest.fn(),
		isPaymentCardAdded: false,
	};
	it('renders', () => {
		const tree = shallow(<AddPaymentMethodForm {...initialProps} />);
		matchSnapshot(tree);
	});

	it('renders without onFormValidCheck function', () => {
		const tree = shallow(<AddPaymentMethodForm
			cancelForm={jest.fn()}
			addPaymentCard={jest.fn()}
			displayCancelButton
			isPaymentCardAdded
		/>);
		matchSnapshot(tree);
	});

	it('sets state properly when handleInputChange is called with value not set to empty', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.cardNumber).toEqual('');
		tree.instance().handleInputChange({ target: { value: '234567890876', name: 'cardNumber' } });
		expect(tree.instance().state.cardNumber).toEqual('2345 6789 0876');
	});

	it('does not change state when handleInputChange is called with value set to non-digit value', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.cardNumber).toEqual('');
		tree.instance().handleInputChange({ target: { value: 'aaaa', name: 'cardNumber' } });
		expect(tree.instance().state.cardNumber).toEqual('');
	});

	it('does not change state when handleInputChange is called with value greater than required max length', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.cardNumber).toEqual('');
		tree.instance().handleInputChange({ target: { value: '234567890876456786567865', name: 'cardNumber' } });
		expect(tree.instance().state.cardNumber).toEqual('');
	});

	it('formats cardNumber state properly when formatCardDetail', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.cardNumber).toEqual('');
		tree.instance().formatCardDetail('cardNumber', '234567890876');
		expect(tree.instance().state.cardNumber).toEqual('2345 6789 0876');
	});

	it('formats cardExpirationDate state properly when formatCardDetail', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.cardExpirationDate).toEqual('');
		tree.instance().formatCardDetail('cardExpirationDate', '1299');
		expect(tree.instance().state.cardExpirationDate).toEqual('12/99');
	});

	it('formats zip state properly when formatCardDetail', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.zip).toEqual('');
		tree.instance().formatCardDetail('zip', '67899');
		expect(tree.instance().state.zip).toEqual('67899');
	});


	it('formats cvv state properly when formatCardDetail', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);

		expect(tree.instance().state.cvv).toEqual('');
		tree.instance().formatCardDetail('cvv', '129');
		expect(tree.instance().state.cvv).toEqual('129');
	});

	it('return truthy value if form is valid when isFormValid method is called', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);
		tree.instance().setState({
			cardNumber: '23456789',
			cardExpirationDate: '12/09',
			cvv: '437',
			zip: '23457',
		});
		expect(tree.instance().isFormValid()).toEqual(true);
	});

	it('return falsy value if form is invalid when isFormValid method is called', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);
		expect(tree.instance().isFormValid()).toEqual(false);
	});

	it('should call isFormValid when component did update', () => {
		const tree = shallow(
			<AddPaymentMethodForm
				{...initialProps}
			/>
		);
		tree.instance().isFormValid = jest.fn();
		tree.instance().componentDidUpdate({ prevProps: { isPaymentCardAdded: false } });
		expect(tree.instance().isFormValid).toHaveBeenCalled();
	});
});
