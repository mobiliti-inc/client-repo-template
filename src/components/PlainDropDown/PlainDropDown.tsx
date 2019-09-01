import React, { FC, ReactNode, useState, useEffect } from 'react';
import classNames from 'classnames';

import './PlainDropDown.scss';

type customStyle = {
	background?: string;
	color?: string;
	height?: string;
	width?: string;
};

interface IProps {
	style?: customStyle;
	children?: ReactNode;
	showContent: boolean;
	isSplitted?: boolean;
	topContent?: ReactNode;
	updateShowContent: (showContent: boolean) => void;
}

const PlainDropDown: FC<IProps> = ({ style, children, topContent, showContent, updateShowContent, isSplitted }) => {
	const [isDroppedDown, setIsDroppedDown] = useState(showContent);

	const handleClick = () => {
		setIsDroppedDown(!isDroppedDown);
		updateShowContent(!isDroppedDown);
		console.log('aa');
	};
	const dropDownMenuClass = classNames('dropdown-menu__top',
		{ 'dropdown-menu__top-open': isDroppedDown },
		{ 'dropdown-menu__top-close': !isDroppedDown },
		{ 'dropdown-menu__top-open--divider': isSplitted && isDroppedDown }
	);

	useEffect(() => {
		setIsDroppedDown(showContent);
	}, [showContent]);
	return (
		<div
		style={style}
		styleName="dropdown-menu"
		>
				<div
				role="presentation"
				styleName={dropDownMenuClass}
				onClick={handleClick}>
					{topContent}
				</div>
				<div styleName="dropdown-menu__bottom">
					{children}
				</div>
		</div>
	);
};

export default PlainDropDown;