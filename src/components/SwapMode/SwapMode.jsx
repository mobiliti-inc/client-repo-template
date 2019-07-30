/* eslint no-underscore-dangle: 0 */
/* eslint-disable camelcase */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import AppFrame from '../../components/AppFrame/AppFrame';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Alert from '../../components/Alert/Alert';

import {
	getMarkets,
	refreshAccessToken,
	getUserInformation,
	selectUserLocation,
} from '../../actions';
import handleAuthRequiredApiCall from '../../utils/handleAuthRequiredApiCall';

import { MarketModel } from '../../models';
import styles from './SwapMode.scss';

export const SwapContext = React.createContext({});

const currentYear = moment().year();

class SwapMode extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		swapMode: PropTypes.bool.isRequired,
		markets: PropTypes.arrayOf(MarketModel).isRequired,
		subscriber: PropTypes.shape({
			fetched: PropTypes.bool,
			fetching: PropTypes.bool,
			user: PropTypes.shape({
				first_name: PropTypes.string,
				last_name: PropTypes.string,
				email: PropTypes.email,
				phone: PropTypes.phone,
				dob: PropTypes.string,
			}),
		}).isRequired,
		age: PropTypes.shape({
			fetched: PropTypes.bool,
			data: PropTypes.shape({
				age: PropTypes.string
			})
		}),
		swap: PropTypes.shape({
			swap: PropTypes.bool.isRequired,
			data: PropTypes.objectOf(PropTypes.any).isRequired,
		}).isRequired,
		authData: PropTypes.shape({
			email: PropTypes.string,
			accessToken: PropTypes.string,
			refreshToken: PropTypes.string,
			subscriber_id: PropTypes.number,
		}).isRequired,
		isTokenRefreshed: PropTypes.bool.isRequired,
		history: PropTypes.shape({
			goBack: PropTypes.func.isRequired,
			push: PropTypes.func.isRequired,
			location: PropTypes.shape({
				hash: PropTypes.string,
				key: PropTypes.string,
				pathname: PropTypes.string,
				search: PropTypes.string,
			})
		}).isRequired,
		getUserInformation: PropTypes.func.isRequired,
		selectUserLocation: PropTypes.func.isRequired,
		getMarkets: PropTypes.func.isRequired,
	}

	static defaultProps = {
		age: {
			data: {
				age: '',
			},
			fetched: false,
		},
	}

	state = {
		age: '',
		showSwapModal: true,
	};

	componentDidMount() {
		const { swap } = this.props.swap;
		if (swap) {
			this.fetchMarketsIfNoneFound();
			this.fetchUserInfo();
		} else {
			this.props.history.push('/my-vehicles');
		}
	}

	componentDidUpdate = (prevProps) => {
		const { subscriber: { fetching, fetched, }, isTokenRefreshed } = this.props;
		if (fetched && !fetching && prevProps.fetched !== fetched) {
			this.checkUserAge();
		}

		if (isTokenRefreshed && prevProps.isTokenRefreshed !== isTokenRefreshed) {
			this.fetchUserInfo();
		}
	}

	fetchMarketsIfNoneFound = () => {
		if (this.props.markets.length === 0) {
			this.props.getMarkets();
		}
	}

	fetchUserInfo = () => {
		const {
			authData: {
				refreshToken, accessToken,
			},
			history,
		} = this.props;
		handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			this.props.getUserInformation,
			refreshAccessToken,
		);
	}

	checkUserAge = () => {
		const { user: { dob } } = this.props.subscriber;
		const formattedDob = moment(dob, 'MM/DD/YYYY');
		const initialAge = '25+';
		if (!this.state.age) {
			if (dob && formattedDob._isValid) {
				const dobYear = `${currentYear - formattedDob.year()}`;
				this.setState({ age: dobYear });
			} else if (this.props.age.fetched) {
				this.setState({ age: this.props.age.data.age });
			} else {
				this.setState({ age: initialAge });
			}
		}
	}

	render() {
		const {
			children,
			subscriber: { fetching, fetched },
			swapMode,
			swap: { swap },
		} = this.props;

		const { age, showSwapModal } = this.state;
		return (
			<AppFrame {...this.props}>
				{fetched && !fetching && age && swap ?
					(
						<SwapContext.Provider value={{
							userAge: age,
							swapMarket: this.props.swap,
							swapMode,
						}}
						>
							<Alert
								show={showSwapModal}
								title="Swap Mode"
								subTitle="You are currently Swapping your vehicle"
								closable={false}
							/>
							{children}
						</SwapContext.Provider>
					)
					:
					(
						<div styleName="loader-container">
							<LoadingSpinner show blue />
						</div>
					)
				}
			</AppFrame>
		);
	}
}

const mapStateToProps = state => ({
	subscriber: state.subscriber.data,
	authData: state.auth.userData,
	isTokenRefreshed: state.auth.isTokenRefreshed,
	markets: state.markets.data,
	market: state.market,
	swap: state.swap,
});

export default withRouter(connect(
	mapStateToProps,
	{
		getMarkets,
		getUserInformation,
		selectUserLocation,
		refreshAccessToken,
	}
)(CSSModules(SwapMode, styles, { allowMultiple: true })));

export { SwapMode };
