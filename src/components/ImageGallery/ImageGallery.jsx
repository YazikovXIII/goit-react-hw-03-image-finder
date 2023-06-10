import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export class ImageGallery extends React.Component {
  render() {
    const { images, modalOnShow } = this.props;

    return (
      <GalleryList>
        <ImageGalleryItem images={images} modalOnShow={modalOnShow} />
      </GalleryList>
    );
  }
}
