import { styled } from '@mui/system';
import React from 'react';
import { FlexAlignCenter } from './FlexBox';
import { StyledCircularProgress } from './Components';

const StyledLoader = styled(FlexAlignCenter)(({ theme }) => ({
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  background: '#FFF',
  zIndex: theme.zIndex.tooltip,

  '& .circleProgress': {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
}));

const Loader = () => {
  return (
    <StyledLoader>
      <StyledCircularProgress className="circleProgress" />
    </StyledLoader>
  );
};

export default Loader;
