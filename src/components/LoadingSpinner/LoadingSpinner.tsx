import React from 'react';
import PropTypes from 'prop-types';

import styles from './LoadingSpinner.scss';

const LoadingSpinner = ({ show, black, blue, parentClass }) => (
	<React.Fragment >
		{ typeof show !== 'undefined' && show && (
			<div className={`loading-spinner ${parentClass}`} styleName={`loading-ring ${black ? 'black' : ''} ${blue ? 'blue' : ''}`}>
				<div />
				<div />
				<div />
			</div>
		)}
	</React.Fragment>
);

LoadingSpinner.propTypes = {
	show: PropTypes.bool.isRequired,
	black: PropTypes.bool,
	blue: PropTypes.bool,
	parentClass: PropTypes.string,
};

LoadingSpinner.defaultProps = {
	black: false,
	blue: false,
	parentClass: '',
};

export default CSSModules(LoadingSpinner, styles, { allowMultiple: true });
