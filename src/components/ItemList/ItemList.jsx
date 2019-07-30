import styles from './ItemList.scss';

const ItemList = ({ header, subHeader, number }) => (
	<div styleName="item-list">
		{number && <div styleName="item-list--label"><span>{number}</span></div>}
		<div styleName="item-list--text">
			{header && <p>{header}</p>}
			{subHeader && <p>{subHeader}</p>}
		</div>
	</div>
);

ItemList.propTypes = {
	header: PropTypes.string,
	subHeader: PropTypes.string,
	number: PropTypes.string,
};

ItemList.defaultProps = {
	header: '',
	subHeader: '',
	number: '',
};

export default CSSModules(ItemList, styles, { allowMultiple: true });
