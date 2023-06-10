import React from 'react';
import { Container } from './styled/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './helpers/fetch';
import { BtnContainer } from './styled/ContainerBtn.styled';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { StyledImg } from './styled/App.styled';

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
    total: null,
    showModal: false,
    imgModal: null,
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

    if (!searchQuery) {
      this.setState({ error: 'There is nothing in the search field' });
      return;
    }

    this.setState({ query: searchQuery, isLoading: true, error: null });
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
          total: totalHits,
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

  openModal = e => {
    this.setState({ imgModal: e.target.dataset.url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const {
      images,
      isEmpty,
      isLoading,
      error,
      isShowButton,
      total,
      showModal,
      imgModal,
    } = this.state;
    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} modalOnShow={this.openModal} />
        {showModal && (
          <Modal modalHide={this.toggleModal}>
            <StyledImg src={imgModal} alt="Ooops!"></StyledImg>
          </Modal>
        )}
        {isEmpty && <p>Sorry. There are no images ... 😭</p>}
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {isShowButton && (
          <BtnContainer>
            <LoadMoreButton onClick={this.handleClickBtn}>
              Load More...
            </LoadMoreButton>
          </BtnContainer>
        )}
        {total === images.length && <p>That's all,folks!</p>}
      </Container>
    );
  }
}
