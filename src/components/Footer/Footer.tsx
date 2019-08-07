import React from "react";
import { withRouter } from "react-router";
import Link from "../Link/Link";
import fb from "../../assets/images/fb.svg";
import ig from "../../assets/images/ig.svg";
import tw from "../../assets/images/tw.svg";
import lin from "../../assets/images/lin.svg";
import styles from "./Footer.scss";

type FooterProps = {
	isLoggedIn: boolean,
	logOut: (...args: any[]) => any,
	history: {
		push: (...args: any[]) => any
	}
};

class Footer extends React.PureComponent<FooterProps, {}> {
	render() {
		const { isLoggedIn, logOut, history } = this.props;
		return (
			<footer id="footer">
				<div className="footer-bottom">
					<div className="container-fluid">
						<div className="footer-bottom-holder">
							<div className="left-block">
								<a href="https://www.mobiliti.com/" className="logo">
									<img width="219" height="41" src="https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector-219x41.png"
										className="attachment-thumbnail_226x41 size-thumbnail_226x41"
										alt=""
										srcSet="https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector-219x41.png 219w, https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector-300x56.png 300w, https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector-768x144.png 768w, https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector-283x53.png 283w, https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector-475x89.png 475w, https://www.mobiliti.com/wp-content/uploads/2018/06/mobiliti_whitelogo_vector.png 918w"
										sizes="(max-width: 219px) 100vw, 219px"
									/>
								</a>
								<ul id="navigation" className="nav-footer">
									<li>
										<a href="https://www.mobiliti.com/about/">About</a>
									</li>
									<li>
										<a target="_blank" rel="noopener noreferrer" href="https://intercom.help/mobiliti">
											FAQ
										</a>
									</li>
									<li>
										<a href="https://www.mobiliti.com/contact/">Contact</a>
									</li>
									{!isLoggedIn && (
										<li>
											<Link to="/sign-up/name">Sign Up</Link>
										</li>
									)}
									{!isLoggedIn && (
										<li>
											<Link to="/sign-in">Sign In</Link>
										</li>
									)}
									{isLoggedIn && (
										<li>
											<button styleName="log-out-btn-link" onClick={() => logOut(history)}>
												Log Out
											</button>
										</li>
									)}
									{isLoggedIn && (
										<li>
											<Link to="/user/my-info">My Profile</Link>
										</li>
									)}
								</ul>
								<p className="copyright">
									©2018 Mobiliti, LLC. All rights reserved. | 1.800.216.0156 |{" "}
									<a href="https://www.mobiliti.com/wp-content/uploads/2018/06/Privacy-Policy.pdf" target="_blank" rel="noopener noreferrer">
										Privacy Policy
									</a>{" "}
									|&nbsp;
									<a href="https://www.mobiliti.com/wp-content/uploads/2018/07/Mobiliti-TERMS-AND-CONDITIONS.pdf" target="_blank" rel="noopener noreferrer">
										Terms and Conditions
									</a>
								</p>
							</div>
							<div className="right-block">
								<ul className="list-store">
									<li>
										<a href="https://itunes.apple.com/us/app/mobiliti/id1326755398?ls=1&amp;mt=8" target="_blank" rel="noopener noreferrer">
											<img src="https://www.mobiliti.com/wp-content/themes/mobiliti/images/img-app-store.png" alt="App Store" />
										</a>
									</li>
									<li>
										<a href="https://play.google.com/store/apps/details?id=com.mobiliti" target="_blank" rel="noopener noreferrer">
											<img src="https://www.mobiliti.com/wp-content/themes/mobiliti/images/img-google-play.png" alt="Google play" />
										</a>
									</li>
								</ul>
								<ul className="social-networks">
									<li>
										<a href="https://www.linkedin.com/company/mobiliti-llc/" target="_blank" rel="noopener noreferrer">
											<img src={lin} alt="" />
										</a>
									</li>
									<li>
										<a href="https://www.facebook.com/MobilitiChoice/" target="_blank" rel="noopener noreferrer">
											<img src={fb} alt="" />
										</a>
									</li>
									<li>
										<a href="https://twitter.com/mobilitichoice" target="_blank" rel="noopener noreferrer">
											<img src={tw} alt="" />
										</a>
									</li>
									<li>
										<a href="https://www.instagram.com/mobilitichoice/" target="_blank" rel="noopener noreferrer">
											<img src={ig} alt="" />
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default withRouter(CSSModules(Footer, styles, { allowMultiple: true }));
