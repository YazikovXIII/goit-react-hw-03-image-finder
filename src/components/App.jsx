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
    per_page: 12,
    error: null,
    isEmpty: false,
    isLoading: false,
    isShowButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ images: [], page: 1, isEmpty: false }, () => {
        this.handleSearch(query, this.state.page);
      });
    } else if (prevState.page !== page) {
      this.handleSearch(query, page);
    }
  }

  handleSearch = async searchQuery => {
    const { page, per_page } = this.state;
    this.setState({ query: searchQuery, isLoading: true });
    try {
      const response = await fetchImages(searchQuery, page);
      const fetchedImages = response.data.hits;
      const { totalHits } = response.data;

      if (page === 1) {
        if (!fetchedImages.length) {
          this.setState({ isEmpty: true, isLoading: false });
          return;
        }
        this.setState({
          images: fetchedImages,
          isShowButton: page < Math.ceil(totalHits / per_page),
          isLoading: false,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...fetchedImages],
          isShowButton: page < Math.ceil(totalHits / per_page),
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  handleClickBtn = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { images, isEmpty, isLoading, error, isShowButton } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} />
        {isEmpty && <p>Sorry. There are no images ... 😭</p>}
        {isLoading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {isShowButton && (
          <LoadMoreButton onClick={this.handleClickBtn}>
            Load More
          </LoadMoreButton>
        )}
      </Container>
    );
  }
}
