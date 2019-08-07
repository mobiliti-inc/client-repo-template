import React, { PureComponent } from 'react'
import classNames from 'classnames';
import styles from './InputContainer.scss';

type InputContainerProps = {
	horizontal?: boolean,
	vertical?: boolean,
	className?: string
};

type InputContainerState = {
	vertical: boolean,
	horizontal: boolean,
	vertical: any,
	horizontal: any,
	vertical: boolean
};

class InputContainer extends PureComponent<
	InputContainerProps,
	InputContainerState
	> {
	state = {
		vertical: false
	};

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
		const combinedClassNames = classNames(defaultClassNames, {
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
