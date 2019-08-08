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
					className={styles['loading-spinner']`${parentClass}`}
					styleName={`loading-ring ${black ? 'black' : ''} ${blue ? 'blue' : ''}`}
				>
					<div />
					<div />
					<div />
				</div>
			)}
	</Fragment>
);

export default LoadingSpinner;
