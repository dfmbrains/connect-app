import React, { FC, useEffect, useState } from 'react';
import { FlexBetween, FlexGap10 } from './FlexBox';
import { Avatar, Box, Icon, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { IPost } from '../models/posts.models';
import { createLike, deleteLike, getIsProfileLiked, getLikesCount } from '../api/likes/likes.api';
import PostsLoader from './PostsLoader';
import { PostRootCard } from './Components';
import SubscribeButton from './SubscribeButton';

const StyledImg = styled('img')(() => ({
  width: '100%',
  objectFit: 'cover',
}));

interface IPostsFeedCard {
  post: IPost;
}

const PostsFeedCard: FC<IPostsFeedCard> = ({ post }) => {
  const [loading, setLoading] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLikedLoading, setIsLikedLoading] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  const handleGetData = async () => {
    setLoading(true);

    const [isLikedResponse, likesCountResponse] = await Promise.all([
      getIsProfileLiked(post.id),
      getLikesCount(post.id),
    ]);

    setIsLiked(isLikedResponse.value);
    setLikesCount(likesCountResponse.value);
  };

  const handleLike = async () => {
    if (!isLikedLoading) {
      setIsLiked(true);
      setIsLikedLoading(true);

      try {
        await createLike(post.id);
        setLikesCount(prevState => prevState + 1);
      } catch (e) {
        console.log(e);
      }

      setIsLikedLoading(false);
    }
  };

  const handleRemoveLike = async () => {
    if (!isLikedLoading) {
      setIsLiked(false);
      setIsLikedLoading(true);

      try {
        await deleteLike(post.id);
        setLikesCount(prevState => prevState - 1);
      } catch (e) {
        console.log(e);
      }

      setIsLikedLoading(false);
    }
  };

  useEffect(() => {
    handleGetData()
      .finally(() => setLoading(false));
  }, []);

  return (
    loading
      ? <PostsLoader />
      : <PostRootCard>
        <FlexBetween p={2}>
          <FlexGap10>
            <Avatar src={post.profile.avatar || ''} />

            <div>
              <Link to={`/users/${post.profile.id}`}>
                <Typography fontWeight="500" lineHeight="100%"
                            variant="body2">{post.profile.firstname}</Typography>
              </Link>

              {post.profile.firstname && (
                <Typography lineHeight="100%" variant="caption">{post.profile.firstname}</Typography>
              )}
            </div>
          </FlexGap10>

          <SubscribeButton targetUserId={post.profile.id} />
        </FlexBetween>

        <StyledImg src={post.image} alt={post.id} />

        <Box p={2}>
          <FlexGap10 ml={-1}>
            {isLiked
              ? <IconButton color="error" onClick={handleRemoveLike}>
                <Icon>favorite</Icon>
              </IconButton>
              : <IconButton color="error" onClick={handleLike}>
                <Icon>favorite_border</Icon>
              </IconButton>
            }
          </FlexGap10>

          <Typography mt={0.5} mb={1} fontWeight="500" variant="body2">{likesCount} likes</Typography>

          <Typography fontWeight="500" variant="body2">{post.profile.firstname} <span
            style={{ fontWeight: '400' }}>{post.description}</span></Typography>
        </Box>
      </PostRootCard>
  );
};

export default PostsFeedCard;