import React from 'react';
import { SearchWrapper, StyledField } from './Serachbar.styled';

export class Searchbar extends React.Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <SearchWrapper>
        <form onSubmit={this.handleSubmit}>
          <div className="input_wrapper">
            <StyledField
              type="text"
              name="search"
              onChange={this.handleChange}
              required
              autoFocus
              value={value}
            />
            <button className="input_button" type="submit">
              Search
            </button>
          </div>
        </form>
      </SearchWrapper>
    );
  }
}
