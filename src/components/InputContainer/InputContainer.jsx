import classNames from 'classnames';

import styles from './InputContainer.scss';

class InputContainer extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		horizontal: PropTypes.bool,
		vertical: PropTypes.bool,
		className: PropTypes.string,
	};

	static defaultProps = {
		horizontal: false,
		vertical: false,
		className: '',
	};

	state = {
		vertical: false,
	}

	componentWillMount() {
		const { horizontal, vertical } = this.props;
		if ((horizontal && vertical) || (!horizontal && !vertical)) {
			this.setState({
				vertical: true,
				horizontal: false
			});
		} else {
			this.setState({
				vertical,
				horizontal
			});
		}
	}

	render() {
		const { children, className } = this.props;
		const { vertical, horizontal } = this.state;
		const defaultClassNames = 'input-container';
		const combinedClassNames = classNames(defaultClassNames,
			{
				'container-horizontal': horizontal,
				'container-vertical': vertical
			});

		return (
			<div styleName={combinedClassNames} className={className}>
				{children}
			</div>
		);
	}
}

export default CSSModules(InputContainer, styles, { allowMultiple: true });
