import React, { useState } from 'react';
import { FlexAllCenter, FlexBox } from 'components/FlexBox';
import { InputAdornment, styled, TextField, Typography } from '@mui/material';
import Logo from 'assets/brand/logo.png';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ILogin } from 'models/auth.models';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedState } from 'store/auth.states';

const LoginBox = styled(FlexBox)(() => ({
  height: '100vh',
  width: '100%',
}));

const FormBox = styled(FlexAllCenter)(({ theme }) => ({
  width: '50%',
  position: 'relative',

  '& .content': {
    width: '322px',
    textAlign: 'center',
    marginTop: '-50px',
  },

  '& .logo': {
    width: '120px',
  },

  '& .title': {
    margin: '18px 0 27px',
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

    '& a': {
      color: theme.palette.primary.main,
    },

    '& p': {
      color: 'rgba(5, 4, 62, 0.3)',
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

const StyledForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px',
}));

const initialValues: ILogin = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required('password is required'),
  username: Yup.string().required('username is required'),
});

const Login = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  if (isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }

  const handleSubmit = async (values: ILogin) => {
    setLoading(true);
    await login(values);
    setLoading(false);
  };

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
        <div className="content">
          <img className="logo" src={Logo} alt="connect" />

          <Typography className="title" variant={'h2'}>
            Login
          </Typography>

          <Formik
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              return (
                <StyledForm onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    name="username"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.username}
                    onChange={handleChange}
                    label="Username"
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon color="success" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlineIcon color="success" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <LoadingButton
                    fullWidth
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                  >
                    Connect!
                  </LoadingButton>
                </StyledForm>
              );
            }}
          </Formik>
        </div>

        <div className="additional">
          <Typography variant="body2">
            <a href="https://t.me/dfmbrains" target="_blank">
              Problems logging in? Contact the administrator.
            </a>
          </Typography>
          <Typography mt={1} variant="body2">
            ⓒ 马萨。
          </Typography>
        </div>
      </FormBox>
    </LoginBox>
  );
};

export default Login;
