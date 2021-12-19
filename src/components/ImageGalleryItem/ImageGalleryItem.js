import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.scss";

const ImageGalleryItem = ({ imagesUrl, imagesAlt, imageId, onClick }) => {
  return (
    <li className={styles.GalleryItem} onClick={onClick}>
      <img
        className={styles.GalleryImage}
        src={imagesUrl}
        alt={imagesAlt}
        id={imageId}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imagesUrl: PropTypes.string.isRequired,
  imagesAlt: PropTypes.string.isRequired,
  imageId: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
