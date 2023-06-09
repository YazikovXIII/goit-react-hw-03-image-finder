import React from 'react';
import { Container } from './styled/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './helpers/fetch';
import { LoadMoreButton } from './Button/Button';

export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
  };

  handleSearch = async searchQuery => {
    try {
      const response = await fetchImages(searchQuery, this.state.page);
      const fetchedImages = response.data.hits;
      this.setState({ images: fetchedImages });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  render() {
    const { images } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} />
        <LoadMoreButton>Load More</LoadMoreButton>
      </Container>
    );
  }
}
