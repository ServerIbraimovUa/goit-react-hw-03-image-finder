import { GalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ data, onShow }) {
  return (
    <>
      {data.map(({ id, largeImageURL, webformatURL }) => {
        return (
          <GalleryItem key={id} onClick={() => onShow(largeImageURL)}>
            <img src={webformatURL} alt="" />
          </GalleryItem>
        );
      })}
    </>
  );
}
