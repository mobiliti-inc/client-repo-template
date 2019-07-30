import styles from './BottomBorderedCard.scss';

export const BottomBorderedCard = ({ leftText, rightText, }) => (
	<div styleName="content">
		<div styleName="content">
			{ leftText }
		</div>
		<div styleName="content-right">
			{rightText}
		</div>
	</div>
);

BottomBorderedCard.propTypes = {
	leftText: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	rightText: PropTypes.string.isRequired,
};
export default CSSModules(BottomBorderedCard, styles);

