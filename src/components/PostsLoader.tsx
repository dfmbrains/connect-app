import React from 'react';
import { StyledCircularProgress } from './Components';
import { Card, styled } from '@mui/material';
import { FlexAllCenter } from './FlexBox';

const StyledFlexAllCenter = styled(FlexAllCenter)(() => ({
  width: '100%',
  height: '300px',
}));


const PostsLoader = () => {
  return (
    <Card>
      <StyledFlexAllCenter>
        <StyledCircularProgress />
      </StyledFlexAllCenter>
    </Card>
  );
};

export default PostsLoader;