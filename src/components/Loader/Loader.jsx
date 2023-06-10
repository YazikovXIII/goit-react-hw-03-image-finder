import React from 'react';
import styled from 'styled-components';
import { Audio } from 'react-loader-spinner';

const StyledAudioWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Loader = () => {
  return (
    <StyledAudioWrapper className="audiowrapper">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperClass="audiowrapper"
      />
    </StyledAudioWrapper>
  );
};
