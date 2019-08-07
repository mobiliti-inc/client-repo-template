import Menu from '../Menu/Menu';
import styles from './Nav.scss';

class Header extends React.PureComponent<{}, {}> {
	render() {
		return (
			<nav styleName="container">
				<Menu />
			</nav>
		);
	}
}

export default CSSModules(Header, styles);
