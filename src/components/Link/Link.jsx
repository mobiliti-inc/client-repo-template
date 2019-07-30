import { Link } from 'react-router-dom';

import styles from './Link.scss';

class StyledLink extends React.PureComponent {
	static propTypes = {
		to: PropTypes.string.isRequired,
		children: PropTypes.node.isRequired,
		external: PropTypes.bool,
		buttonStyle: PropTypes.bool,
		alternate: PropTypes.bool,
	}

	static defaultProps = {
		external: false,
		buttonStyle: false,
		alternate: false,
	}

	renderLink = () => {
		const linkClass = `link--${this.props.buttonStyle ? 'button' : 'standard'} ${this.props.alternate ? 'alternate' : ''}`;
		if (this.props.external) {
			return (
				<a
					styleName={linkClass}
					href={this.props.to}
					target="_blank"
					rel="noopener noreferrer"
				>
					{this.props.children}
				</a>
			);
		}
		return (
			<Link
				styleName={linkClass}
				to={this.props.to}
			>
				{this.props.children}
			</Link>
		);
	}

	render() {
		return this.renderLink();
	}
}

export default CSSModules(StyledLink, styles, { allowMultiple: true });
