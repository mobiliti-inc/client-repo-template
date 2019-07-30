import ZipCodeInput from '../ZipCodeInput';

describe('ZipCodeInput', () => {
	it('renders', () => {
		const subject = shallow(<ZipCodeInput
			value=""
			onChange={() => {}}
			valid
		/>);
		matchSnapshot(subject);
	});
});
