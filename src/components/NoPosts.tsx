import React from 'react';
import { Typography } from '@mui/material';
import NoPostsIcon from 'assets/icons_png/no_posts.png';
import { styled } from '@mui/system';
import { PostRootCard } from './Components';

const StyledCard = styled(PostRootCard)(({ theme }) => ({
  padding: 16,
  paddingTop: 32,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',

  '& img': {
    width: '15%',
  },

  '& h6': {
    width: '95%',
    margin: '16px auto 0',
    color: theme.palette.primary.main,
  },
}));

const NoPosts = ({ text }: { text?: string }) => {
  return (
    <StyledCard>
      <div>
        <img src={NoPostsIcon} alt="no_posts" />
        <Typography fontWeight="500" variant="h6">
          {text
            || 'Welcome to the beginning of something new! Be the first to share your story and spark the conversation in our uncharted digital space.'}
        </Typography>
      </div>
    </StyledCard>
  );
};

export default NoPosts;