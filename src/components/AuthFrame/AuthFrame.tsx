import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./AuthFrame.scss";
import brandLogo from "../../assets/icons/logo_Dark.svg";
import appStoreBadge from "../../assets/icons/app-store.svg";
import googleStoreBadge from "../../assets/icons/google-play.svg";
import backArrowImage from "../../assets/icons/icon_Arrow-Left.svg";
import imgSignupBackground from "../../assets/images/img_SignIn-Background.png";
import { iconClose } from "../../assets";
import Link from "../Link/Link";

type AuthFrameProps = {
	showBackButton?: boolean,
	showCloseButton?: boolean,
	history: {
		goBack: (...args: any[]) => any
	},
	userIsLoggedIn: boolean
};

class AuthFrame extends PureComponent<AuthFrameProps, {}> {
	componentWillMount = () => {
		const { history, userIsLoggedIn } = this.props;
		if (userIsLoggedIn) {
			history.goBack();
		}
	}

	render() {
		const { children, showBackButton, showCloseButton } = this.props;
		return (
			<div styleName="auth-frame">
				<div styleName="section-auth-content">
					<div styleName="navigation-container">
						{showBackButton ? (
							<div
								styleName="back-arrow-container"
								onClick={this.props.history.goBack}
								role="presentation"
							>
								<img src={backArrowImage} styleName="back-arrow-image" alt="back arrow" />
							</div>
						) : null}
						{showCloseButton ? (
							<div styleName="close-icon-container">
								<img src={iconClose} styleName="close-icon" alt="close" />
							</div>
						) : null}
					</div>
					<div styleName="brand-logo-container">
						<img styleName="brand-logo" src={brandLogo} alt="brand-logo" />
					</div>
					<div styleName="main-content">{children}</div>
					<div styleName="mobile-store-container">
						<Link to="https://itunes.apple.com/us/app/mobiliti/id1326755398?ls=1&amp;mt=8" external>
							<img styleName="img-app-store" src={appStoreBadge} alt="app-store" />
						</Link>
						<Link to="https://play.google.com/store/apps/details?id=com.mobiliti" external>
							<img styleName="img-play-store" src={googleStoreBadge} alt="play-store" />
						</Link>
					</div>
				</div>
				<div styleName="section-cover-image">
					<img src={imgSignupBackground} alt="signup background" />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userIsLoggedIn: state.auth.isLoggedIn
});

export const AuthFrameComponent = CSSModules(AuthFrame, styles, { allowMultiple: true });

export default withRouter(connect(mapStateToProps)(AuthFrameComponent));
