import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@mui/material';
import { createSubscription, deleteSubscription, getIsProfileSubbed } from '../api/subscribtions/subscriptions.api';

const SubscribeButton = ({ targetUserId }: { targetUserId: string }) => {
  const [isSubLoading, setIsSubLoading] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const [renderLoading, setRenderLoading] = useState<boolean>(true);

  const handleSubscribe = async () => {
    if (!isSubLoading) {
      setIsSubscribed(true);
      setIsSubLoading(true);

      try {
        await createSubscription(targetUserId);
      } catch (e) {
        console.log(e);
      }

      setIsSubLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!isSubLoading) {
      setIsSubscribed(false);
      setIsSubLoading(true);

      try {
        await deleteSubscription(targetUserId);
      } catch (e) {
        console.log(e);
      }

      setIsSubLoading(false);
    }
  };

  useEffect(() => {
    getIsProfileSubbed(targetUserId)
      .then(response => setIsSubscribed(response.value))
      .finally(() => setRenderLoading(false));
  }, []);

  return (
    isSubscribed
      ? <LoadingButton size="small" color="error" variant="outlined" onClick={handleUnsubscribe}
                       endIcon={<Icon>remove_done</Icon>} loading={renderLoading}>unsubscribe</LoadingButton>
      : <LoadingButton size="small" color="primary" variant="contained" onClick={handleSubscribe}
                       endIcon={<Icon>done_all</Icon>} loading={renderLoading}>subscribe</LoadingButton>
  );
};

export default SubscribeButton;