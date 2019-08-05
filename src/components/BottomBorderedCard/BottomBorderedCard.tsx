import styles from "./BottomBorderedCard.scss";

type BottomBorderedCardProps = {
	leftText: React.ReactNode | string,
	rightText: string
};

export const BottomBorderedCard: React.SFC<BottomBorderedCardProps> = ({
	leftText,
	rightText
}) => (
		<div styleName="content">
			<div styleName="content">{leftText}</div>
			<div styleName="content-right">{rightText}</div>
		</div>
	);

export default CSSModules(BottomBorderedCard, styles);
