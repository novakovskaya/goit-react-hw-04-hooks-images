import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.scss";

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={styles.Gallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          imagesUrl={image.webformatURL}
          imagesAlt={image.tags}
          imageId={image.id}
          onClick={() => {
            onOpenModal(image);
          }}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
