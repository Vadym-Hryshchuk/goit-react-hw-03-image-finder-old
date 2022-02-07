import Button from "../button/Button";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";
const ImageGallery = ({ images, onClick, loadMore }) => {
  return (
    <>
      {images.length > 0 ? (
        <>
          <ul className="gallery">
            {images.map((image) => (
              <ImageGalleryItem
                key={image.id}
                id={image.id}
                small={image.webformatURL}
                large={image.largeImageURL}
                description={image.tags}
                onClick={() =>
                  onClick({
                    id: image.id,
                    url: image.largeImageURL,
                    alt: image.tags,
                  })
                }
              />
            ))}
          </ul>
          <Button onClick={loadMore} />
        </>
      ) : (
        <p>Будь ласка, введіть Ваш пошуковий запит</p>
      )}
    </>
  );
};

export default ImageGallery;
