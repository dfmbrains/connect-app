import React from 'react';
import { Typography } from '@mui/material';

const SimpleCardTitle = ({
  title,
  noMargin,
}: {
  title: string;
  noMargin?: boolean;
}) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{ mb: noMargin ? 0 : 2, fontWeight: '700' }}
    >
      {title}
    </Typography>
  );
};

export default SimpleCardTitle;
