import { backArrow } from "../../assets";
import styles from "./ReserveCheckoutFrame.scss";
import Tile from "../Tile/Tile";
import VehicleTitle from "../VehicleTitle/VehicleTitle";
import VehicleCostBreakdown from "../../pages/Vehicles/Detail/VehicleCostBreakdown/VehicleCostBreakdown";
import VehicleDealer from "../../pages/Vehicles/Detail/VehicleDealer/VehicleDealer";
import VehicleModel from "../../models/Vehicle";

type ReserveCheckoutFrameProps = {
	vehicle: any,
	pageTitle: string,
	history: {
		goBack?: (...args: any[]) => any
	},
	location: {
		data?: {
			latitude?: number,
			longitude?: number
		},
		geolocationUnavailable?: boolean
	},
	getUserLocation: (...args: any[]) => any
};

class ReserveCheckoutFrame extends React.Component<ReserveCheckoutFrameProps, {}> {
	componentWillMount() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
	render() {
		const {
			vehicle_title,
			objImages,
			year_of_make,
			vehicle_model,
			vehicle_make,
			vehicle_status,
			subscription_price
		} = this.props.vehicle;
		const costBreakdown = [{ name: "", price: subscription_price }]; // @TODO: get real cost breakdown
		const imageUrl = objImages[0].image_url;
		return (
			<div styleName="container">
				<div styleName="left">
					<div styleName="reserve-nav">
						<button onClick={this.props.history.goBack} styleName="back-arrow">
							<img src={backArrow} alt="Back" />
						</button>
						<p>{this.props.pageTitle}</p>
					</div>
					<Tile className="lighter-tile">
						<img styleName="vehicle-image" src={imageUrl} alt={`${vehicle_title}`} />
						<div styleName="vehicle-details-container">
							<div>
								<div styleName="vehicle-tile-container">
									<VehicleTitle
										yearOfMake={year_of_make}
										vehicleModel={vehicle_model}
										vehicleMake={vehicle_make}
										vehicleStatus={vehicle_status}
									/>
								</div>
								<VehicleCostBreakdown data={costBreakdown} removeBorderBottom />
							</div>
						</div>
					</Tile>

					<VehicleDealer
						vehicle={this.props.vehicle}
						location={this.props.location}
						getUserLocation={this.props.getUserLocation}
					/>
				</div>
				<div styleName="right">{this.props.children}</div>
			</div>
		);
	}
}

export default CSSModules(ReserveCheckoutFrame, styles);
export { ReserveCheckoutFrame };
