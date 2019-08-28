import * as React from 'react';
import { connect } from "react-redux";

import { fetchDealers } from '../../actions';

import { AllSetModal } from '../../components';

interface Props {
	fetchDealers: () => {};
}

const HomePage: React.FC<Props> = (props) => {
	React.useEffect(() => {
		props.fetchDealers();
	}, []);

	return (
		<div>
			Coming soon ....
				<AllSetModal modalIsVisible showCloseModal />
		</div>
	);
};

const mapStateToProps = ({ data = {}, isLoadingData = false }) => ({
	data,
	isLoadingData
});

const mapDispatchProps = {
	fetchDealers
};

export default connect(
	mapStateToProps,
	mapDispatchProps
)(HomePage);
