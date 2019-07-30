import styles from './ProgressEllipsis.scss';

class ProgressEllipsis extends React.PureComponent {
	static propTypes = {
		step: PropTypes.string.isRequired,
	};

	render() {
		switch (this.props.step) {
			case 'name':
				return (
					<div styleName="container">
						<div styleName="dot--dark" />
						<div styleName="dot" />
						<div styleName="dot" />
					</div>
				);
			case 'email':
				return (
					<div styleName="container">
						<div styleName="dot" />
						<div styleName="dot--dark" />
						<div styleName="dot" />
					</div>
				);
			case 'password':
				return (
					<div styleName="container">
						<div styleName="dot" />
						<div styleName="dot" />
						<div styleName="dot--dark" />
					</div>
				);
			default:
				return null;
		}
	}
}

export default CSSModules(ProgressEllipsis, styles);
