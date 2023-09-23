import { Component } from 'react';
import { fetchPixabayImg } from 'services/pixabay-api';
import ImageGalleryItem from 'components/ImageGalleryItem';
// import * as basicLightbox from 'basiclightbox';

import { GalleryList } from './ImageGallery.styled';
import { animateScroll } from 'react-scroll';
import LoadMore from 'components/LoadMore/LoadMore';
import Loader from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';

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
    photo: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;
    const prevName = prevProps.imageName;
    const prevPage = prevState.page;

    if (prevName !== imageName || prevPage !== page) {
      this.fetchPixabayImg(imageName, page);
    }
  }

  fetchPixabayImg = async (name, page) => {
    this.setState({ status: PENDING });
    if (!name) return;

    try {
      const { hits } = await fetchPixabayImg(name, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: RESOLVED,
      }));
    } catch (err) {}
  };

  onClickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      duration: 2000,
      delay: 10,
      smooth: 'linear',
    });
  };

  toggleModal = photo => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      photo,
    }));
  };
  render() {
    const { status, images, showModal, photo } = this.state;
    console.log(images);
    if (status === IDLE) {
      return <h1>Search</h1>;
    }

    if (status === RESOLVED) {
      return (
        <GalleryList>
          <ImageGalleryItem
            data={this.state.images}
            onShow={this.toggleModal}
          />
          {showModal && <Modal photo={photo} />}
          <LoadMore onClick={this.onClickBtn} />
        </GalleryList>
      );
    }
    if (status === PENDING) {
      return <Loader />;
    }

    if (status === REJECTED) {
      return <h1>error</h1>;
    }
  }
}
