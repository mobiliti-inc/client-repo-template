import React from 'react';

import styles from './LocationSelectDropdown.scss';
import Dropdown from '../Dropdown/Dropdown';
import { MarketModel } from '../../models';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

class LocationSelectDropdown extends React.PureComponent {
	static propTypes = {
		number: PropTypes.number.isRequired,
		callback: PropTypes.func.isRequired,
		markets: PropTypes.arrayOf(MarketModel).isRequired,
		currentLocation: PropTypes.shape({
			marketId: PropTypes.number.isRequired,
			marketName: PropTypes.string.isRequired,
		}).isRequired,
		selectUserLocation: PropTypes.func.isRequired,
		scrolling: PropTypes.bool.isRequired,
		showLoader: PropTypes.bool
	}

	static defaultProps = {
		showLoader: false
	}

	getFormattedLocations = () => this.props.markets.map(market => ({
		value: market.market_name,
		current: market.id === this.props.currentLocation.marketId,
	}))

	marketSelected = async value => {
		const selectedMarket = this.props.markets.find(market => market.market_name === value);
		// eslint-disable-next-line camelcase
		const { id, market_name } = selectedMarket;
		await this.props.selectUserLocation(id, market_name);
		await this.props.callback();
		window.scrollTo(0, 0);
	}

	renderVehiclesCount = () =>
		this.props.showLoader ? <LoadingSpinner show blue /> : this.props.number;

	render() {
		return (
			<div styleName={`location-select ${this.props.scrolling ? 'scroll' : ''}`} className="location-select">
				<div styleName="location-select-centered">
					<h1>{this.renderVehiclesCount()}&nbsp;Vehicle{this.props.number === 1 ? '' : 's'} in
					</h1>
					<Dropdown
						onChange={this.marketSelected}
						header="Select a Location"
						data={this.getFormattedLocations()}
						scrolling={this.props.scrolling}
					/>
				</div>
			</div>
		);
	}
}

export default CSSModules(LocationSelectDropdown, styles, { allowMultiple: true });
