import React, { useState } from 'react';
import { InputAdornment, styled, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ILogin } from 'models/auth.models';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PasswordTextField from '../../components/PasswordTextField';

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
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: ILogin) => {
    setLoading(true);
    await login(values);
    setLoading(false);
  };

  return (
    <>
      <Typography className="title" variant={'h2'}>Login</Typography>

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
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                autoComplete="connect-username"
                helperText={touched.username && errors.username}
                error={Boolean(errors.username && touched.username)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />


              <PasswordTextField
                name="password"
                placeholder="Password"
                value={values.password}
                handleBlur={handleBlur}
                handleChange={handleChange}
                autoComplete="connect-password"
                helperText={touched.password && errors.password}
                error={Boolean(errors.password && touched.password)}
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
    </>
  );
};

export default Login;
