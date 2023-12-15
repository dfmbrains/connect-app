import React from 'react';
import { Card } from '@mui/material';
import SimpleCardTitle from './SimpleCardTitle';

const SimpleCard = ({
  title,
  borderColor,
  children,
}: {
  title?: string;
  borderColor?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        padding: '16px 12px',
        position: 'relative',
        border: borderColor ? `1px solid ${borderColor}` : 'none',
      }}
    >
      {title && <SimpleCardTitle title={title} />}

      {children}
    </Card>
  );
};

export default SimpleCard;
