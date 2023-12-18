import React, { useEffect, useState } from 'react';
import { getRecommendedProfiles } from '../../../api/profile/profile.api';
import { useRecoilValue } from 'recoil';
import { profileState } from '../../../store/profile.states';
import { Avatar, Divider, styled, Typography } from '@mui/material';
import { IProfile } from '../../../models/profile.models';
import PostsLoader from '../../../components/PostsLoader';
import Empty from 'assets/icons_png/no_posts.png';
import { FlexAllCenter, FlexBetween, FlexGap10, FlexVerticalGap10 } from '../../../components/FlexBox';
import { PostRootCard } from '../../../components/Components';
import { Link } from 'react-router-dom';
import SubscribeButton from '../../../components/SubscribeButton';

const StyledCard = styled(PostRootCard)(() => ({
  padding: '16px',

  '& .empty': {
    textAlign: 'center',
    width: '100px',
  },
}));

const RecommendedProfiles = () => {
  const profile = useRecoilValue(profileState);

  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getRecommendedProfiles(profile!.id)
      .then(response => setProfiles(response))
      .finally(() => setLoading(false));
  }, []);

  return (
    loading
      ? <PostsLoader />
      : <StyledCard>
        <Typography mb={2} variant="subtitle1" sx={{ fontWeight: 'bold' }}>Suggestions for you:</Typography>

        {profiles.length > 0
          ? <FlexVerticalGap10>
            {profiles.map((item, idx) => (
              <>
                <FlexBetween key={item.id}>
                  <FlexGap10>
                    <Avatar src={item.avatar || ''} />

                    <div>
                      <Link to={`/users/${item.id}`}>
                        <Typography fontWeight="500" lineHeight="100%"
                                    variant="body2">{item.firstname}</Typography>
                      </Link>

                      {item.firstname && (
                        <Typography lineHeight="100%" variant="caption">{item.firstname}</Typography>
                      )}
                    </div>
                  </FlexGap10>

                  <SubscribeButton targetUserId={item.id} />
                </FlexBetween>

                {idx !== profiles.length - 1 && (
                  <Divider />
                )}
              </>
            ))}
          </FlexVerticalGap10>
          : <FlexAllCenter sx={{ height: '300px' }}>
            <img className="empty" src={Empty} alt="empty" />
          </FlexAllCenter>
        }
      </StyledCard>
  );
};

export default RecommendedProfiles;