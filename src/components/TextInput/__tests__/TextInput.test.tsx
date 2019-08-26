import React from 'react';

import { matchSnapshot } from '../../../../testUtils/matchSnapshot';
import { shallow } from 'enzyme';

import TextInput, { INPUT_TYPES } from '../TextInput';

describe('TextInput', () => {
	it('renders', () => {
		const tree = shallow(
			<TextInput
				type={INPUT_TYPES.TEXT}
				onChange={() => { }}
				isValid
				value="test"
				id="test-input"
			/>
		);

		matchSnapshot(tree);
	});

	it('renders the text input with an error class when not valid', () => {
		const tree = shallow(
			<TextInput
				type={INPUT_TYPES.TEXT}
				onChange={() => { }}
				isValid={false}
				value="test"
				id="test-input"
			/>
		);
		expect(tree.find('input.error').length).toBe(1);
	});

	// it('sets the correct value', () => {
	// 	const subject = shallow(
	// 		<TextInput
	// 			type={INPUT_TYPES.TEXT}
	// 			onChange={() => { }}
	// 			value=""
	// 			isValid
	// 			id="test-input"
	// 		/>
	// 	);

	// 	subject.setProps({ value: 'test' });
	// 	expect(subject.instance().props.value).toEqual('test');
	// });

	it('renders the text input with a label when focused by setting a value', () => {
		const tree = shallow(
			<TextInput
				type={INPUT_TYPES.TEXT}
				onChange={() => { }}
				value=""
				isValid
				id="test-input"
				label="Text"
			/>
		);

		tree.setProps = { value: 'test' };
		matchSnapshot(tree);
	});

	it('renders the text input with a checkmark at end when input field is valid and inputDidChange is true', () => {
		const tree = shallow(
			<TextInput
				type={INPUT_TYPES.TEXT}
				onChange={() => { }}
				value="hello"
				id="test-input"
				label="Text"
				isValid
				inputDidChange
			/>
		);

		tree.setProps = { value: 'test' };
		expect(tree.find('.checkmark-label').length).toBe(1);
		matchSnapshot(tree);
	});

	it('does not render the error message when its not provided', () => {
		const tree = shallow(
			<TextInput
				type={INPUT_TYPES.TEXT}
				onChange={() => { }}
				value=""
				id="test-input"
				label="Text"
				isValid={false}
				inputDidChange
			/>
		);

		expect(tree.find('.error-message').length).toBe(0);
	});

	it('renders the error message prop when not valid and inputDidChange is false', () => {
		const tree = shallow(
			<TextInput
				type={INPUT_TYPES.TEXT}
				onChange={() => { }}
				value=""
				id="test-input"
				label="Text"
				isValid={false}
				inputDidChange={false}
				errorMessage="Error"
			/>
		);

		expect(tree.find('.error-message').length).toBe(1);
	});

	describe('Email Text Input', () => {
		it('renders with an error class only when invalid', () => {
			const tree = shallow(
				<TextInput
					type={INPUT_TYPES.EMAIL}
					onChange={jest.fn}
					isValid={false}
					value="test"
					id="test-input"
					errorMessage="Invalid"
				/>
			);
			expect(tree.find('input.error').length).toBe(1);
		});

		it('renders without an error class when valid', () => {
			const tree = shallow(
				<TextInput
					type={INPUT_TYPES.EMAIL}
					onChange={jest.fn}
					isValid
					value="test"
					id="test-input"
					errorMessage=""
				/>
			);
			expect(tree.find('input.error').length).toBe(0);
		});
	});

	describe('Password Text Input', () => {
		// it('renders with password-visibility-indicator class only when shouldShowVisibility is true and value length is more than one', () => {
		// 	const tree = shallow(
		// 		<TextInput
		// 			type={INPUT_TYPES.PASSWORD}
		// 			onChange={jest.fn}
		// 			isValid={false}
		// 			value="test"
		// 			id="test-input"
		// 			shouldShowVisibility
		// 		/>
		// 	);
		// 	expect(tree.find('.password-visibility-indicator').length).toBe(1);
		// });

		it('renders without password-visibility-label class when shouldShowVisibility is false', () => {
			const tree = shallow(
				<TextInput
					type={INPUT_TYPES.PASSWORD}
					onChange={jest.fn}
					isValid={false}
					value="test"
					id="test-input"
				/>
			);
			expect(tree.find('.password-visibility-indicator').length).toBe(0);
		});
	});
});
