import classNames from 'classnames';
import Logo from '../Logo/Logo';
import Menu, { MENU_TYPES } from '../Menu/Menu';
import styles from './Header.scss';

type HeaderProps = {
	scrolling: boolean,
	alternate?: boolean,
	isLoggedIn: boolean,
	className?: string
};
class Header extends React.PureComponent<HeaderProps, {}> {
	render() {
		const { isLoggedIn, className } = this.props;
		const classes = classNames(this.props.scrolling ? 'header-fixed' : 'header', { alternate: this.props.alternate });
		return (
			<header styleName={classes} className={className}>
				<div styleName="header-container">
					<Logo />
					<Menu {...this.props} menuType={MENU_TYPES.HEADER} isLoggedIn={isLoggedIn} />
				</div>
			</header>
		);
	}
}
export default CSSModules(Header, styles, { allowMultiple: true });