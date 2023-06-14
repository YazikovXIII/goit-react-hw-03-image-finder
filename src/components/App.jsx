import React from 'react';
import { Container } from './styled/Container.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './helpers/fetch';
import { BtnContainer } from './styled/ContainerBtn.styled';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { StyledImg, StyledPar } from './styled/App.styled';

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
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  handleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      error: null,
      isEmpty: false,
      isShowButton: false,
    });
  };

  getImages = async (query, page) => {
    const { per_page } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await fetchImages(query, page);
      const { hits, totalHits } = response.data;

      if (!totalHits) {
        this.setState({ isEmpty: true });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
        isShowButton: page < Math.ceil(totalHits / per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
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
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} modalOnShow={this.openModal} />
        {showModal && (
          <Modal modalHide={this.toggleModal}>
            <StyledImg src={imgModal} alt="Ooops!"></StyledImg>
          </Modal>
        )}
        {isEmpty && <StyledPar>Sorry. There are no images ... 😭</StyledPar>}
        {isLoading && <Loader />}
        {error && <StyledPar>{error}</StyledPar>}
        {isShowButton && (
          <BtnContainer>
            <LoadMoreButton onClick={this.handleClickBtn}>
              Load More...
            </LoadMoreButton>
          </BtnContainer>
        )}
        {total === images.length && <StyledPar>That's all,folks!</StyledPar>}
      </Container>
    );
  }
}
