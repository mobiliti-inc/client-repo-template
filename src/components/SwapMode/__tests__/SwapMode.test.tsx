import { SwapMode } from '../SwapMode';

describe('SwapMode', () => {
	const props = {
		children: <div />,
		swapMode: true,
		markets: [{
			id: 1,
			market_name: 'Texas'
		}],
		subscriber: {
			fetched: false,
			fetching: false,
			user: {
				first_name: 'John',
				last_name: 'Doe',
				email: 'john.doe@test.com',
				phone: '123',
				dob: '01/01/1999',
			},
		},
		age: {
			fetched: false,
			data: {
				age: '12'
			}
		},
		swap: {
			swap: true,
			data: {},
		},
		authData: {
			email: 'joe.doe@test.com',
			accessToken: 'token',
			refreshToken: 'token',
			subscriber_id: 1,
		},
		isTokenRefreshed: false,
		history: {
			goBack: jest.fn(),
			push: jest.fn(),
			location: {
				hash: '',
				key: '1',
				pathname: '/',
				search: '/',
			}
		},
		getUserInformation: jest.fn(),
		selectUserLocation: jest.fn(),
		getMarkets: jest.fn(),
	};

	const component = <SwapMode {...props} />;

	it('renders', () => {
		expect(component).toMatchSnapshot();
	});

	it('should show swap modal in case the url matches `/my-vehicles`', () => {
		const swap = {
			swap: false,
			data: {},
		};
		const subject = shallow(<SwapMode {...props} swap={swap} />);
		expect(subject.instance().props.history.push).toBeCalled();
	});

	it('should fetch markets on mount', () => {
		const subject = shallow(<SwapMode {...props} markets={[]} />);
		expect(subject.instance().props.getMarkets).toBeCalled();
	});

	it('should select age based on user dob', () => {
		const subject = shallow(<SwapMode {...props} />);
		subject.setProps({ subscriber: { fetched: true, fetching: false, user: { dob: '01/01/1999' } } });
		expect(subject.state('age')).toEqual('20');
	});

	it('should check if we have age stored in dob is missing', () => {
		const subject = shallow(<SwapMode {...props} />);
		subject.setProps({ subscriber: { fetched: true, fetching: false, user: { dob: '' } }, age: { fetched: true, data: { age: '23' } } });
		expect(subject.state('age')).toEqual('23');
	});

	it('should set initial age to 25+', () => {
		const subject = shallow(<SwapMode {...props} />);
		subject.setProps({ subscriber: { fetched: true, fetching: false, user: { dob: '' } }, age: { fetched: false } });
		expect(subject.state('age')).toEqual('25+');
	});
});
