import { Component } from 'react';
import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import { AppS } from './App.styled';

export default class App extends Component {
  state = {
    imageName: '',
  };

  getValuesForm = val => {
    this.setState({ imageName: val });
  };

  render() {
    return (
      <AppS>
        <SearchBar onSubmit={this.getValuesForm} />
        <ImageGallery imageName={this.state.imageName} />
      </AppS>
    );
  }
}
