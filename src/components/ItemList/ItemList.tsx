import styles from './ItemList.scss';

type ItemListProps = {
	header?: string,
	subHeader?: string,
	number?: string
};

const ItemList: React.SFC<ItemListProps> = ({ header, subHeader, number }) => (
	<div styleName="item-list">
		{number && (
			<div styleName="item-list--label">
				<span>{number}</span>
			</div>
		)}
		<div styleName="item-list--text">
			{header && <p>{header}</p>}
			{subHeader && <p>{subHeader}</p>}
		</div>
	</div>
);

// ItemList.defaultProps = {
// 	header: '',
// 	subHeader: '',
// 	number: ''
// };

export default CSSModules(ItemList, styles, { allowMultiple: true });
