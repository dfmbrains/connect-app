import React, { useState } from 'react';
import { FlexAllCenter, FlexBox } from 'components/FlexBox';
import { Icon, styled, Tab, Tabs, Typography } from '@mui/material';
import Logo from 'assets/brand/logo.png';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedState } from 'store/auth.states';
import Login from './Login';
import SignUp from './SignUp';

const LoginBox = styled(FlexBox)(() => ({
  height: '100vh',
  width: '100%',
}));

const FormBox = styled(FlexAllCenter)(({ theme }) => ({
  width: '50%',
  position: 'relative',

  '& .tabs': {
    position: 'absolute',
    top: '5px',
    right: '5px',
  },

  '& .content': {
    width: '322px',
    textAlign: 'center',
    marginTop: '-50px',
  },

  '& .logo': {
    width: '100px',
  },

  '& .title': {
    margin: '12px 0 20px',
    fontSize: '32px',
    fontWeight: '500',
  },

  '& .additional': {
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translate(-50%)',
    whiteSpace: 'nowrap',
    textAlign: 'center',

    '& .primary': {
      color: theme.palette.primary.main,
    },
    '& .secondary': {
      color: theme.palette.secondary.main,
    },
    '& .light': {
      color: 'rgba(5, 4, 62, 0.3)',
    },

    '& a': {
      textDecoration: `underline ${theme.palette.primary.main}`,
    },
  },
}));

const ImageBox = styled(FlexAllCenter)(() => ({
  width: '50%',
  overflow: 'hidden',
  position: 'relative',
  background:
    'linear-gradient(90deg, rgba(20,214,171,1) 0%, rgba(17,197,173,1) 25%, rgba(14,176,176,1) 50%, rgba(8,139,181,1) 75%, rgba(4,113,185,1) 100%)',

  '& div': {
    margin: '0 0 0 20%',
    width: '100%',
  },
  '& h1': {
    fontWeight: '500',
    color: '#FFFFFF',
    width: '75%',
  },
}));

export type authFormTypes = 'login' | 'signup'
const searchParamsFormTypeKey = 'formType';

const Auth = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const [searchParams, setSearchParams] = useSearchParams();

  const [activeForm, setActiveForm] = useState<authFormTypes>(
    (searchParams.get(searchParamsFormTypeKey) as authFormTypes) || 'login',
  );

  const handleTabChange = (value: authFormTypes) => {
    setActiveForm(value);
    setSearchParams({ [searchParamsFormTypeKey]: value });
  };

  if (isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <LoginBox>
      <ImageBox>
        <div>
          <Typography variant={'h1'}>Share.</Typography>
          <Typography variant={'h1'}>Create.</Typography>
          <Typography variant={'h1'}>Connect.</Typography>
        </div>
      </ImageBox>

      <FormBox>
        <div className="tabs">
          <Tabs centered value={activeForm} onChange={(e, value) => handleTabChange(value)}>
            <Tab label="Login" value="login" icon={<Icon>login</Icon>} iconPosition="end" />
            <Tab label="Sign up" value="signup" icon={<Icon>person_add</Icon>} iconPosition="end" />
          </Tabs>
        </div>

        <div className="content">
          <img className="logo" src={Logo} alt="connect" />

          {activeForm === 'login' ? <Login /> : <SignUp handleTabChange={handleTabChange} />}
        </div>

        <div className="additional">
          <FlexBox sx={{ alignItems: 'center', columnGap: '5px' }}>
            <Typography className="secondary" variant="body2">Problems logging in? </Typography>
            <Typography variant="body2">
              <a className="primary" href="https://t.me/dfmbrains" target="_blank">Contact the administrator</a>
            </Typography>
          </FlexBox>

          <Typography className="light" mt={1} variant="body2">ⓒ 马萨。</Typography>
        </div>
      </FormBox>
    </LoginBox>
  );
};

export default Auth;