import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { scroll, logOut, refreshAccessToken, uploadUserProfilePhoto } from '../../actions';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './ProfileFrame.scss';
import { LocationModel } from '../../models';
import verifyToken from '../../utils/verifyToken';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProfileWrapper from '../../pages/Profile/common/ProfileWrapper/ProfileWrapper';
import handleAuthRequiredApiCall from '../../utils/handleAuthRequiredApiCall';

const NO_FOOTER_ROUTES = ['/'];

let lastScrollY = 0;

class ProfileFrame extends React.PureComponent {
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
		subscriber: PropTypes.shape({
			profile_photo: PropTypes.string,
		}).isRequired,
		uploadUserProfilePhoto: PropTypes.func.isRequired,
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
		window.scrollTo({ top: 0, behavior: 'smooth' });
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

	handleUploadUserProfilePhoto = (imageData) => {
		const {
			accessToken,
			refreshToken,
			refreshAccessToken,
			uploadUserProfilePhoto,
			history,
		} = this.props;
		handleAuthRequiredApiCall(
			accessToken,
			refreshToken,
			history,
			uploadUserProfilePhoto,
			refreshAccessToken,
			imageData
		);
	}
	render() {
		const {
			location: { pathname },
			isLoggedIn,
			logOut,
			children,
			accessToken,
			requiresAuth,
			scrolling,
			subscriber,
		} = this.props;

		const noFooter = NO_FOOTER_ROUTES.some(el => pathname === el);
		if (!verifyToken(accessToken) && requiresAuth) {
			return (
				<div styleName="loader-container">
					<LoadingSpinner show blue parentClass={styles.loader} />
				</div>);
		}
		return (
			<div styleName="profile-frame">
				<Header
					logOut={logOut}
					isLoggedIn={isLoggedIn}
					scrolling={scrolling}
					styleName={scrolling ? 'profile-header--scrolled' : 'profile-header'}
				/>
				<div styleName="profile-container">
					<main styleName="content">
						<ProfileWrapper
							profilePhoto={subscriber.profile_photo}
							handleUploadUserProfilePhoto={this.handleUploadUserProfilePhoto}
						>
							{children}
						</ProfileWrapper>
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
	subscriber: state.subscriber.data.user,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ scroll, logOut, refreshAccessToken, uploadUserProfilePhoto, }
	)(CSSModules(ProfileFrame, styles, { allowMultiple: true }))
);
