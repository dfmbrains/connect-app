import React, { useState } from 'react';
import { Container } from 'components/Components';
import Logo from 'assets/brand/full_logo.png';
import { styled } from '@mui/system';
import { FlexBetween, FlexGap10 } from 'components/FlexBox';
import { Avatar, Card, Icon, IconButton, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled(Card)(({ theme }) => ({
  padding: '10px 0 12px',
  marginBottom: '20px',

  '& .active': {
    '& .icon': {
      color: theme.palette.primary.main,
    },
  },

  '& .icon': {
    fontSize: '28px',
  },
}));

const StyledImg = styled('img')(() => ({
  width: '60px',
}));

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  return (
    <header>
      <StyledHeader>
        <Container>
          <FlexBetween>
            <FlexGap10>
              <NavLink to="/">
                <StyledImg src={Logo} alt="connect" />
              </NavLink>
              <div />
              <div />

              {isSearchActive && <TextField size="small" focused />}
            </FlexGap10>

            <FlexGap10>
              <IconButton
                onClick={() => setIsSearchActive(!isSearchActive)}
                title="Search user"
                size="small"
                color="primary"
              >
                <Icon className="icon">person_search</Icon>
              </IconButton>
              <NavLink to="/">
                <IconButton title="Posts" size="small">
                  <Icon className="icon">home</Icon>
                </IconButton>
              </NavLink>
              <NavLink to="/create">
                <IconButton title="Create post" size="small">
                  <Icon className="icon">add_circle</Icon>
                </IconButton>
              </NavLink>
              <NavLink to="/favorite">
                <IconButton title="Notifications" size="small">
                  <Icon className="icon">favorite</Icon>
                </IconButton>
              </NavLink>

              <div />

              <IconButton>
                <Avatar />
              </IconButton>
            </FlexGap10>
          </FlexBetween>
        </Container>
      </StyledHeader>
    </header>
  );
};
export default Header;
