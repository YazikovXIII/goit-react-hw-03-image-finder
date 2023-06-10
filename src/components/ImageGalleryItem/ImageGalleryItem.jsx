import React from 'react';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends React.Component {
  render() {
    const { images, modalOnShow } = this.props;

    return (
      <>
        {images.map(image => (
          <StyledGalleryItem className="gallery-item" key={image.id}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              width="200px"
              height="140px"
              data-url={image.largeImageURL}
              onClick={modalOnShow}
            />
          </StyledGalleryItem>
        ))}
      </>
    );
  }
}
