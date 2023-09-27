import { Component } from 'react';
import { fetchPixabayImg } from 'services/pixabay-api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import LoadMore from 'components/LoadMore/LoadMore';
import Loader from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';
import { scrollToBottom } from 'utils/scroll';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const { IDLE, PENDING, RESOLVED, REJECTED } = STATUS;
export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: IDLE,
    showModal: false,
    photo: '',
    totalImages: 0,
    loadMore: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;
    const prevName = prevProps.imageName;
    const prevPage = prevState.page;

    if (prevName !== imageName) {
      this.setState({ images: [] });
      this.fetchPixabayImg(imageName);
    }

    if (prevPage !== page && this.state.status === RESOLVED) {
      this.fetchPixabayImg(imageName, page);
    }
  }

  fetchPixabayImg = async (name, page) => {
    this.setState({ status: PENDING });
    if (!name) return;
    try {
      const { hits, totalHits } = await fetchPixabayImg(name, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
        status: RESOLVED,
        totalImages: prevState.totalImages + hits.length,
      }));

      if (totalHits === 0) {
        return await Promise.reject(new Error('Please write correct name'));
      }
    } catch (err) {
      this.setState({ status: REJECTED, error: err.message });
      console.log(err.message);
    }
  };

  onClickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    scrollToBottom();
  };

  openModal = photo => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      photo,
    }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { status, error, showModal, photo, loadMore } = this.state;
    if (status === IDLE) {
      return <h2>Please enter a picture name</h2>;
    }

    if (status === RESOLVED) {
      return (
        <>
          <h2>Result "{this.props.imageName}"</h2>
          <GalleryList>
            <ImageGalleryItem
              data={this.state.images}
              openModal={this.openModal}
            />
          </GalleryList>
          {loadMore && <LoadMore onClick={this.onClickBtn} />}
          {!loadMore && <p>The pictures in this section have run out 😒😒 </p>}
          {showModal && <Modal photo={photo} closeModal={this.closeModal} />}
        </>
      );
    }
    if (status === PENDING) {
      return <Loader />;
    }

    if (status === REJECTED) {
      return <h2>{error}</h2>;
    }
  }
}
