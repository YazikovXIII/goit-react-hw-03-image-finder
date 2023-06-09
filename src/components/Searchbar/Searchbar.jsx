import React from 'react';
import { SearchWrapper, StyledField } from './Serachbar.styled';
import { Formik, Form } from 'formik';

export class Searchbar extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    this.props.onSearch(values.searchQuery);
    setSubmitting(false);
    console.log('values', values);
  };

  render() {
    return (
      <SearchWrapper>
        <Formik
          initialValues={{ searchQuery: '' }}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input_wrapper">
                <StyledField type="text" name="searchQuery" />
                <button
                  className="input_button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </SearchWrapper>
    );
  }
}
