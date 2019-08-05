import styles from './Logo.scss';
import image from '../../assets/logos/mobiliti_white.png';

class Logo extends React.PureComponent {
	static defaultProps = {
		image
	}
	render() {
		return (
			<div styleName="logo">
				<a href="//mobiliti.com">
					<img width="219" height="41" src={this.props.image} alt="Mobiliti" />
				</a>
			</div>
		);
	}
}

export default CSSModules(Logo, styles);
