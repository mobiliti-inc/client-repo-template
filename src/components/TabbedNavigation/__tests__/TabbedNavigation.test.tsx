import TabbedNavigation from '../TabbedNavigation';


describe('TabbedNavigation', () => {
	it('renders', () => {
		const tabs = [
			{
				title: 'tab1',
				data: <div>Data1</div>
			},
			{
				title: 'tab2',
				data: <div>Data2</div>
			},
			{
				title: 'tab3',
				data: <div>Data3</div>
			},
		];
		const subject = shallow(<TabbedNavigation
			tabs={tabs}
		/>);
		expect(subject.text()).toEqual('<Tabs />');
	});
});
