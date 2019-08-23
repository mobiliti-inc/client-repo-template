import React from 'react';
import cx from 'classnames';

import './Tile.scss';

interface TileProps {
	className?: string;
}

const Tile: React.FC<TileProps> = (props) => {
	const { className, children } = props;
	const classes = cx('bare-tile', className);
	return <div styleName={classes}>{children}</div>;

};

export default Tile;
