import styles from './PhotoRecBox.scss';

type PhotoRecBoxProps = {
	isVertical?: boolean,
	boxIcon?: string,
	boxTitle?: string,
	boxDescription?: string,
	onBoxClick: (...args: any[]) => any,
	boxImage?: string,
	onUploadImageInputChange?: (...args: any[]) => any
};

const PhotoRecBox: React.SFC<PhotoRecBoxProps> = ({
	onBoxClick,
	boxIcon,
	isVertical,
	boxTitle,
	boxDescription,
	boxImage,
	onUploadImageInputChange
}) => (
		<div role="presentation" onClick={onBoxClick} styleName={`rec-box rec-box--${isVertical ? 'vertical' : 'horizontal'}`}>
			{boxIcon && (
				<span styleName={`circle circle--${isVertical ? 'vertical' : 'horizontal'}`}>
					<img src={boxIcon} alt="box icon" />
				</span>
			)}

			{
				<input
					styleName="input-front-license"
					type="file"
					name="front-license"
					id="front-license"
					accept="image/jpeg"
					onChange={onUploadImageInputChange}
				/>
			}
			{boxImage && (
				<div styleName="box-image-container">
					<img styleName="box-image" src={boxImage} alt="box" />
					<div styleName="check-mark-circle">
						<span styleName="check-mark" />
					</div>
				</div>
			)}
			{boxTitle && <div styleName={`box-title box-title--${isVertical ? 'vertical' : 'horizontal'}`}>{boxTitle}</div>}
			{boxDescription && (
				<div styleName={`box-description box-description--${isVertical ? 'vertical' : 'horizontal'}`}>{boxDescription}</div>
			)}
		</div>
	);

// PhotoRecBox.defaultProps = {
// 	isVertical: true,
// 	boxIcon: '',
// 	boxTitle: '',
// 	boxDescription: '',
// 	boxImage: '',
// 	onUploadImageInputChange: () => {}
// };

export default CSSModules(PhotoRecBox, styles, { allowMultiple: true });
