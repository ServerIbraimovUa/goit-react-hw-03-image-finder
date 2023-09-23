import { Component } from 'react';
import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import { AppS } from './App.styled';

export default class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
  };

  getValuesForm = val => {
    this.setState({ imageName: val, page: 1, images: [] });
  };

  render() {
    return (
      <AppS>
        <SearchBar onSubmit={this.getValuesForm} />
        <ImageGallery imageName={this.state.imageName} page={this.state.page} />
      </AppS>
    );
  }
}
