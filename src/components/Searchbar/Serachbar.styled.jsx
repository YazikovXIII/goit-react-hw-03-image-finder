import styled from 'styled-components';
import { Field } from 'formik';

export const SearchWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 10px;
  right: 10px;
  display: block;
  margin-top: 10px;
  background-color: #4f60df;
  padding: 10px;
  border-radius: 5px;

  .input_wrapper {
    position: relative;
    display: flex;
    margin: 0 20px;
  }

  .input_button {
    position: absolute;
    display: block;
    top: 0;
    left: 25;
  }
`;

export const StyledField = styled(Field)`
  width: 100%;
  padding-left: 60px;
`;
