import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { scroll, logOut, refreshAccessToken } from '../../actions';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './AppFrame.scss';
import { LocationModel } from '../../models';
import verifyToken from '../../utils/verifyToken';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ALTERNATE_STYLING_ROUTES = ['/vehicles', '/reserve', '/checkout', '/user', 'my-vehicles', '/swap-vehicle'];
const NO_FOOTER_ROUTES = ['/'];

let lastScrollY = 0;

class AppFrame extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		location: LocationModel.isRequired,
		scroll: PropTypes.func.isRequired,
		scrolling: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		logOut: PropTypes.func.isRequired,
		requiresAuth: PropTypes.bool,
		accessToken: PropTypes.string,
		refreshToken: PropTypes.string,
		refreshAccessToken: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
	};

	static defaultProps = {
		requiresAuth: false,
		accessToken: '',
		refreshToken: '',
	}

	componentWillMount = () => {
		this.handleVerifyToken();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleVerifyToken = () => {
		const { accessToken, refreshAccessToken, refreshToken, requiresAuth } = this.props;
		if ((!accessToken || !refreshAccessToken) && requiresAuth) {
			return this.props.history.push('/sign-in');
		}
		if (!verifyToken(accessToken) && requiresAuth) {
			refreshAccessToken(refreshToken, this.props.history);
		}
	}

	handleScroll = () => {
		lastScrollY = window.pageYOffset;
		const scrolling = lastScrollY > 0;
		this.props.scroll(scrolling);
	};

	toggleShowVideo = () => this.setState({ showVideo: !this.state.showVideo })
	render() {
		const {
			location: { pathname },
			isLoggedIn,
			logOut,
			children,
			accessToken,
			requiresAuth,
		} = this.props;


		const alternateStyling = ALTERNATE_STYLING_ROUTES.some(el => pathname.indexOf(el) > -1);
		const noFooter = NO_FOOTER_ROUTES.some(el => pathname === el);
		if (!verifyToken(accessToken) && requiresAuth) {
			return (
				<div styleName="loader-container">
					<LoadingSpinner show blue parentClass={styles.loader} />
				</div>);
		}

		return (
			<div styleName="app-frame">
				<Header
					logOut={logOut}
					isLoggedIn={isLoggedIn}
					scrolling={this.props.scrolling}
					alternate={alternateStyling}
				/>
				<div styleName={`app-container ${alternateStyling ? 'alternate' : ''}`}>
					<main styleName="content">
						{children}
					</main>
				</div>
				{
					!noFooter &&
					<Footer
						logOut={logOut}
						isLoggedIn={isLoggedIn}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	scrolling: state.scrolling,
	isLoggedIn: state.auth.isLoggedIn,
	accessToken: state.auth.userData.accessToken,
	refreshToken: state.auth.userData.refreshToken,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ scroll, logOut, refreshAccessToken }
	)(CSSModules(AppFrame, styles, { allowMultiple: true }))
);
