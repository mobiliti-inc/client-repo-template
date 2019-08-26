import React, { Fragment } from 'react';
import cx from 'classnames';

import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
	show: boolean;
	black?: boolean;
	blue?: boolean;
	className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ show, black, blue, className }) => (
	<Fragment>
		{typeof show !== 'undefined' &&
			show && (
				<div
					styleName={cx(className, 'loading-ring', { black, blue })}
				>
					<div />
					<div />
					<div />
				</div>
			)}
	</Fragment>
);

export default LoadingSpinner;
