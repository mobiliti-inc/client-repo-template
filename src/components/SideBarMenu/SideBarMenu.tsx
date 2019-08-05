import { withRouter } from 'react-router';

import styles from './SideBarMenu.scss';
import Link from '../Link/Link';

class SideBarMenu extends React.PureComponent {
	renderMenuContents = (data) => {
		const currentPath = this.props.history.location.pathname;
		return data.map((item, index) => {
			const isActiveClass = currentPath === item.path ? 'side-bar-menu__link-active' : '';
			const paddingBottomClass = data.length !== (index + 1) ? 'side-bar-menu__ladder' : '';
			const isDisabledClass = item.disabled ? 'link-disabled' : '';
			return (
				<div key={item.title} styleName={paddingBottomClass}>
					<div styleName={`side-bar-menu__link-wrapper ${isActiveClass} ${isDisabledClass}`} >
						<Link to={item.path}>{item.title}</Link>
					</div>
				</div>
			);
		});
	}
	render() {
		const { menuContent } = this.props;
		return (
			<div styleName="side-bar-menu">
				{this.renderMenuContents(menuContent)}
			</div>

		);
	}
}

SideBarMenu.propTypes = {
	history: PropTypes.objectOf(PropTypes.any).isRequired,
	menuContent: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withRouter(CSSModules(SideBarMenu, styles, { allowMultiple: true }));
