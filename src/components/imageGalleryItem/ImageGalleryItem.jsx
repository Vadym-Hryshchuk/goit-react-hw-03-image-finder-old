const ImageGalleryItem = ({ id, small, large, description, onClick }) => {
  return (
    <li className="gallery-item" onClick={onClick}>
      <img src={small} alt={description} id={id} />
    </li>
  );
};

export default ImageGalleryItem;
