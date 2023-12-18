import React, { useEffect, useState } from 'react';
import { getPopularPostsWithImages } from '../../../api/posts/posts.api';
import { IPost } from '../../../models/posts.models';
import PostsLoader from '../../../components/PostsLoader';
import { Grid } from '@mui/material';
import PostsFeedCard from '../../../components/PostsFeedCard';
import NoPosts from '../../../components/NoPosts';

const PopularPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetData = async () => {
    setLoading(true);

    const response = await getPopularPostsWithImages();
    setPosts(response);
  };

  useEffect(() => {
    handleGetData().finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading
        ? <PostsLoader />
        : posts.length > 0
          ? <Grid container spacing={5}>
            {posts.map(post => (
              <Grid key={post.id} item xs={12}>
                <PostsFeedCard post={post} />
              </Grid>
            ))}
          </Grid>
          : <NoPosts />
      }
    </>
  );
};

export default PopularPosts;
