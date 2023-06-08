import React from 'react';

export class ImageGalleryItem extends React.Component {
  render() {
    const { images } = this.props;
    console.log(images);

    return (
      <>
        {images.map(image => (
          <li className="gallery-item" key={image.id}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              width="200px"
              height="140px"
            />
          </li>
        ))}
      </>
    );
  }
}
