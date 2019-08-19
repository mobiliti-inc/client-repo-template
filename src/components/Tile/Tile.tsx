import React from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules'

import * as styles from './Tile.scss';

interface TileProps {
	className?: string;
};

const Tile: React.FC<TileProps> = (props) => {
	const { className, children } = props;
	const classes = cx('bare-tile', className);
	return <div styleName={classes}>{children}</div>;

}

export default CSSModules(Tile, styles, { allowMultiple: true });
