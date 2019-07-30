import React from 'react';
import classNames from 'classnames';

import styles from './Tile.scss';

class Tile extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string,
	}

	static defaultProps = {
		className: ''
	}

	render() {
		const classes = classNames('bare-tile', this.props.className);
		return (
			<div styleName={classes}>
				{ this.props.children }
			</div>
		);
	}
}

export default CSSModules(Tile, styles, { allowMultiple: true });
