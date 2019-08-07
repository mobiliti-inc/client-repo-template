import React, { Fragment } from 'react';
import styles from './LoadingSpinner.scss';

type LoadingSpinnerProps = {
	show: boolean,
	black?: boolean,
	blue?: boolean,
	parentClass?: string
};

const LoadingSpinner: React.SFC<LoadingSpinnerProps> = ({ show, black, blue, parentClass }) => (
	<Fragment>
		{typeof show !== 'undefined' &&
			show && (
				<div
					className={`loading-spinner ${parentClass}`}
					styleName={`loading-ring ${black ? 'black' : ''} ${blue ? 'blue' : ''}`}
				>
					<div />
					<div />
					<div />
				</div>
			)}
	</Fragment>
);

// LoadingSpinner.defaultProps = {
// 	black: false,
// 	blue: false,
// 	parentClass: ''
// };

export default CSSModules(LoadingSpinner, styles, { allowMultiple: true });
