/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import classNames from 'classnames';

import styles from './RadioSelector.scss';

class RadioSelector extends React.PureComponent {
	static propTypes = {
		onSelectOption: PropTypes.func.isRequired,
		options: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.shape({
				key: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number
				]),
				value: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number
				])
			})),
			PropTypes.arrayOf(PropTypes.shape({
				value: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number
				])
			}))
		]).isRequired,
		disabled: PropTypes.bool,
		hideValue: PropTypes.bool,
		keyIsVisible: PropTypes.bool,
		selectedItem: PropTypes.string,
	}

	static defaultProps = {
		disabled: false,
		hideValue: false,
		keyIsVisible: true,
		selectedItem: '',
	}
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: null,
			data: {},
			options: props.options
		};
	}

	componentWillMount() {
		const { selectedItem } = this.props;
		this.setState({
			data: { key: selectedItem }
		});
	}

	componentDidUpdate(prevProps) {
		const { options, selectedItem } = this.props;
		if (options.length !== prevProps.options.length) {
			this.setState({
				options,
			});
		}

		if (prevProps.selectedItem !== selectedItem) {
			this.setState({
				data: { key: selectedItem }
			});
		}
	}

	onSelect = (event, data, index) => {
		const { selectedIndex } = this.state;
		const { options, disabled } = this.props;
		const optionDisabled = data.disabled;
		const radioDisabled = disabled;
		if (optionDisabled || radioDisabled) {
			event.stopPropagation();
		} else {
			if (selectedIndex) { Object.assign(options[selectedIndex], { current: false }); }
			Object.assign(options[index], { current: true });
			Object.assign({}, options);
			Object.assign(data, { current: true });
			this.setState({
				selectedIndex: index,
				data,
				options
			});
			this.props.onSelectOption(data, index);
		}
	}

	checkSeleceted = (selectedData) => {
		const { data } = this.state;
		if (selectedData.key) {
			return selectedData.current && data.key === selectedData.key;
		}
	}

	renderOptions = (options) => options.map((data, index) => {
		const { key, value, imageUrl, optionalText } = data;
		const { disabled, hideValue, keyIsVisible } = this.props;
		const optionDisabled = data.disabled;
		const radioDisabled = disabled;
		const radioButtonClass = classNames('radio-button', { selected: this.checkSeleceted(data) });
		const dataSelectorClass = classNames('data-selector', { selected: this.checkSeleceted(data), disabled: optionDisabled || radioDisabled });
		const valueClass = classNames('value', { selected: this.checkSeleceted(data), disabled: optionDisabled || radioDisabled, hide: hideValue });
		const keyTextClass = classNames('key-text', { disabled: optionDisabled || radioDisabled });
		return (
			<div
				role="presentation"
				styleName={dataSelectorClass}
				onClick={(event) => this.onSelect(event, data, index)}
				key={key}
			>
				<div styleName="key">
					<div styleName={radioButtonClass}>
						<div styleName={this.checkSeleceted(data) ? 'radio-button-selected' : 'hide'} />
					</div>
					{keyIsVisible && <p styleName={keyTextClass}>{key}</p> }
					{imageUrl && <img styleName="radio-icon" src={imageUrl} alt="radio icon" />}
					<div styleName="optional-text">
						{ optionalText }
					</div>
				</div>
				{value && <p styleName={valueClass}>{value}</p>}
			</div>
		);
	})

	render() {
		const { options } = this.state;
		return (
			<React.Fragment>
				{this.renderOptions(options)}
			</React.Fragment>
		);
	}
}

export default CSSModules(RadioSelector, styles, { allowMultiple: true });
