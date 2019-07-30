/* eslint react/no-array-index-key: 0 */
import React from 'react';

import styles from './Rating.scss';
import { star, starFilled } from '../../assets/icons';

class Rating extends React.PureComponent {
	static propTypes = {
		stars: PropTypes.number.isRequired,
	}

	createRatingArray = () => [0, 0, 0, 0, 0].map((num, i) => i < this.props.stars ? 1 : 0);

	renderStars = array => array.map((num, i) => num ? <img key={`star-${i}`} src={starFilled} alt="star" />
		: <img key={`empty-star-${i}`} src={star} alt="star" />)

	render() {
		const ratingArray = this.createRatingArray();
		return (
			<div>
				{ this.renderStars(ratingArray) }
			</div>
		);
	}
}

export default CSSModules(Rating, styles, { allowMultiple: true });
