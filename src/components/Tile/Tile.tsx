import React from 'react';
import classNames from 'classnames';
import styles from './Tile.scss';

type TileProps = {
	className?: string
};

class Tile extends React.PureComponent<TileProps, {}> {
	render() {
		const classes = classNames('bare-tile', this.props.className);
		return <div styleName={classes}>{this.props.children}</div>;
	}
}

export default CSSModules(Tile, styles, { allowMultiple: true });
