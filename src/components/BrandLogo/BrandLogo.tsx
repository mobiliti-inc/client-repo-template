import React, { FC, ReactNode } from "react";
import { brandLogo } from "../../assets";

import "./BrandLogo.scss";

type customStyle = {
	background?: string;
	color?: string;
	height?: string;
	width?: string;
};

interface IProps {
	style?: customStyle;
	logo?: string;
	brandName?: string | ReactNode;
}

const BrandLogo: FC<IProps> = ({ style, logo, brandName }) => (
		<div style={style} styleName="brand">
			<img src={logo || brandLogo} alt="Brand Logo" />
			<span styleName="brand__name">{brandName || "carsales.com"}</span>
		</div>
	);

export default BrandLogo;
