import { Box, Card, CircularProgress, styled } from '@mui/material';

const Container = styled(Box)(() => ({
  width: '100%',
  padding: '0 90px',
  margin: '0 auto',
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const PostRootCard = styled(Card)(() => ({
  width: '100%',
  minHeight: '300px',
  border: '1px solid #d2d2d2',
}));

export { Container, StyledCircularProgress, PostRootCard };
