import classNames from 'classnames';
import { withRouter } from 'react-router';


import Link from '../Link/Link';
import styles from './Menu.scss';

export const MENU_TYPES = {
	HEADER: 'header',
	SIDEBAR: 'sidebar',
	HAMBUGER: 'hamburger',
};

class Menu extends React.PureComponent {
	static propTypes = {
		menuType: PropTypes.oneOf(Object.values(MENU_TYPES)),
		isLoggedIn: PropTypes.bool.isRequired,
		logOut: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		menuType: MENU_TYPES.SIDEBAR
	}

	state = {
		menuOpen: false
	}

	toggleDropdown = () => this.setState(prevState => ({ menuOpen: !prevState.menuOpen }))

	render() {
		const { menuType, isLoggedIn, logOut, history } = this.props;
		const classes = classNames(`menu-${menuType}`, { active: this.state.menuOpen });
		return (
			<div styleName={classes}>
				<button
					aria-label="Open Menu"
					styleName="opener"
					onClick={this.toggleDropdown}
				>
					<div /><div /><div />
				</button>
				<div styleName="drop" className="menu-drop">
					<ul>
						<li>
							<a href="https://www.mobiliti.com/about/">About</a>
						</li>
						<li>
							<a href="https://intercom.help/mobiliti" target="_blank" rel="noopener noreferrer">FAQ</a>
						</li>
						<li>
							<a href="https://www.mobiliti.com/contact/">Contact</a>
						</li>
						{ !isLoggedIn &&
							<li>
								<Link to="/sign-up/name">Sign Up</Link>
							</li>
						}
						{ !isLoggedIn &&
							<li>
								<Link to="/sign-in">Sign In</Link>
							</li>
						}
						{ isLoggedIn &&
						<li>
							<button styleName="log-out-btn-link" onClick={(() => logOut(history))}>Log Out</button>
						</li>
						}
						{ isLoggedIn &&
						<li>
							<Link to="/user/my-info">My Profile</Link>
						</li>
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default withRouter(CSSModules(Menu, styles, { allowMultiple: true }));
