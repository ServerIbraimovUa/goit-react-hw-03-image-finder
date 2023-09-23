import { Component } from 'react';
import { Input, SearchForm, Searchbar } from './SearchBar.styled';

export default class SearchBar extends Component {
  state = {
    imageName: '',
  };

  onChangeInput = e => {
    this.setState({ imageName: e.currentTarget.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.imageName);

    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmitForm}>
          <button type="submit">
            <span>Search</span>
          </button>

          <Input
            type="text"
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.onChangeInput}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
