import React from 'react';

import { iconInsurance } from '../../assets/icons';
import Modal from '../Modal/Modal';
import Dropdown from '../Dropdown/Dropdown';
import styles from './AgeSelectModal.scss';
import Button from '../Button/Button';


let ages = [
	{
		value: '21',
		current: false
	},
	{
		value: '22',
		current: false
	},
	{
		value: '23',
		current: false
	},
	{
		value: '24',
		current: false
	},
	{
		value: '25+',
		current: true
	}
];
class AgeSelectDropdown extends React.PureComponent {
	static propTypes = {
		callback: PropTypes.func.isRequired,
		scrolling: PropTypes.bool.isRequired,
		selectUserAge: PropTypes.func.isRequired
	}

	state = {
		modalVisible: true,
		selectedAge: '25+'
	}

	onContinue = async () => {
		const { selectedAge } = this.state;
		this.setState({
			modalVisible: false
		});
		await this.props.selectUserAge(selectedAge);
		this.props.callback();
	}

	ageSelected = (value) => {
		ages = ages.map(age => ({
			value: age.value,
			current: age.value === value
		}));

		this.setState({
			selectedAge: value
		});
	}

	render() {
		const { modalVisible } = this.state;
		return (
			<React.Fragment>
				<Modal
					visible={modalVisible}
					plain
					scrolling={this.props.scrolling}
					freezeOverlay
				>
					<div styleName="content-container">
						<div styleName="icon-circle-wrapper">
							<img src={iconInsurance} alt="lock" />
						</div>
						<div styleName="heading" >
							Insurance is included in each car&#39;s monthly subscription price.
						</div>

						<p styleName="description">
							Enter your age so we can give you an accurate price.
						</p>
						<Dropdown modal data={ages} onChange={this.ageSelected} className="modal-option" scrolling={false} />

						<div styleName="continue-button-container">
							<Button
								onClick={this.onContinue}
							> Continue
							</Button>
						</div>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}

export default CSSModules(AgeSelectDropdown, styles);
