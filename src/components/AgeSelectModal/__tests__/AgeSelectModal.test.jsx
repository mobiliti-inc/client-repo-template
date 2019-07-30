import AgeSelectModal from '../AgeSelectModal';

describe('AgeSelectModal', () => {
	it('renders', () => {
		const subject = shallow(<AgeSelectModal
			scrolling
			callback={() => { }}
			selectUserAge={() => { }}
		/>);

		expect(subject.text()).toContain('<Modal />');
		matchSnapshot(subject);
	});
});
