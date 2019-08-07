import { Link } from 'react-router-dom';
import styles from './Link.scss';
type StyledLinkProps = {
	to: string,
	external?: boolean,
	buttonStyle?: boolean,
	alternate?: boolean
};
class StyledLink extends React.PureComponent<{}, {}> {
	renderLink = () => {
		const linkClass = `link--${this.props.buttonStyle ? 'button' : 'standard'} ${this.props.alternate ? 'alternate' : ''}`;
		if (this.props.external) {
			return (
				<a styleName={linkClass} href={this.props.to} target="_blank" rel="noopener noreferrer">
					{this.props.children}
				</a>
			);
		}
		return (
			<Link styleName={linkClass} to={this.props.to}>
				{this.props.children}
			</Link>
		);
	};
	render() {
		return this.renderLink();
	}
}
export default CSSModules(StyledLink, styles, { allowMultiple: true });
