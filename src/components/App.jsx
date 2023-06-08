import React from 'react';
import { Container } from './styled/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './helpers/fetch';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  handleSearch = async searchQuery => {
    try {
      const response = await fetchImages(searchQuery);
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
      </Container>
    );
  }
}
