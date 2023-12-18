import React from 'react';
import { Container } from 'components/Components';
import PostsBySubscription from './components/PostsBySubscription';
import PopularPosts from './components/PopularPosts';
import { Divider, Grid } from '@mui/material';
import RecommendedProfiles from './components/RecommendedProfiles';

const Home = () => {
  return (
    <Container sx={{ pb: '50px' }}>
      <Grid container spacing={5}>
        <Grid item xs={7}>
          <PostsBySubscription />

          <Divider sx={{ my: 4 }} />

          <PopularPosts />
        </Grid>

        <Grid item xs={5}>
          <RecommendedProfiles />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
