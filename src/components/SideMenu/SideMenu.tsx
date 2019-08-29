import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import './SideMenu.scss';

type customStyle = {
	background?: string;
	color?: string;
	height?: string;
	width?: string;
};

interface IProps {
	style?: customStyle;
	children?: ReactNode;
	visible?: Boolean;
}

const SideMenu: FC<IProps> = ({ style, children, visible }) => {
	return (
		<div style={style} styleName={classNames('side-menu', { visible } )}>
			{children}
		</div>
	);
};

export default SideMenu;
