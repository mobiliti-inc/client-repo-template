import styles from "./EditIcon.scss";
import editImage from "../../assets/images/edit_image.png";

const EditIcon = () => (
	<div styleName="edit-icon">
		<img src={editImage} alt="edit icon" />
	</div>
);

export default CSSModules(EditIcon, styles, { allowMultiple: true });
