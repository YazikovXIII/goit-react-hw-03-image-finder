import styled from 'styled-components';

export const GalleryList = styled.ul`
  margin: 0;
  margin-top: 60px;
  margin-bottom: 10px;
  padding: 0;
  padding: 0 10px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
