import React from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';

import styles from './Icon.scss';

import {
	iconClose,
	iconArrowBack,
	iconEmail,
	iconLocked,
	pinnedPaper,
} from '../../assets/icons';

export const ICON_TYPES = {
	email: iconEmail,
	close: iconClose,
	back: iconArrowBack,
	locked: iconLocked,
	pin: pinnedPaper,
};

class Icon extends React.PureComponent {
	static propTypes = {
		type: PropTypes.oneOf(Object.values(ICON_TYPES)).isRequired,
	}

	render() {
		const { type } = this.props;
		return (
			<SvgLoader path={type}>
				<SvgProxy selector="#icon" />
			</SvgLoader>
		);
	}
}

export default CSSModules(Icon, styles, { allowMultiple: true });
