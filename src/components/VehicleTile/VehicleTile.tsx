/* eslint-disable camelcase */ // API returns lots of snake_case data
import React from "react";
import { isUndefined } from "util";
import { IMAGES_BASE_URL } from "../../../api";
import { VehicleModel } from "../../models";
import styles from "./VehicleTile.scss";
import StatusMessages, { statusClasses } from "../../constants/vehicleStatusCodes";

type VehicleTileProps = {
	vehicle: any,
	onClick: (...args: any[]) => any
};

class VehicleTile extends React.PureComponent<VehicleTileProps, {}> {
	render() {
		if (isUndefined(this.props.vehicle)) return null;
		const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		const {
			vehicle_id,
			vehicle_title,
			subscription_price,
			image_url,
			dealer_name,
			vehicle_status
		} = this.props.vehicle;
		const status = StatusMessages[vehicle_status];
		const vehicleInfoArray = vehicle_title.split(" ");
		vehicleInfoArray.pop();
		const year = vehicleInfoArray.shift();
		const title = vehicleInfoArray.join(" ");
		return (
			<button
				styleName={`vehicle-tile-button ${isIE11 ? "ie11" : ""}`}
				onClick={() => this.props.onClick(vehicle_id)}
			>
				<div styleName="vehicle-tile" id={vehicle_id}>
					<div styleName="vehicle-image-container">
						<div styleName={statusClasses[vehicle_status]}>{status}</div>
						{isIE11 ? (
							<img styleName="thumbnail" src={image_url} alt={`${title}`} />
						) : (
								<div styleName="vehicle-image" style={{ zIndex: -1, backgroundImage: `url(${image_url}` }} />
							)}
					</div>
					<div styleName="vehicle-tile-text">
						<div styleName="vehicle-tile-middle-align">
							<small>{year}</small>
							<div styleName="vehicle-info">
								<div styleName="name-info">
									<h2 styleName="title">{title}</h2>
									<p styleName="subtitle">{dealer_name}</p>
								</div>
								{vehicle_status === 1 && (
									<div styleName="pricing-info">
										<h2 styleName="title alt">${subscription_price}</h2>
										<p styleName="subtitle alt">Starting&nbsp;at</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</button>
		);
	}
}

export default CSSModules(VehicleTile, styles, { allowMultiple: true });
