import React, { useState } from 'react';
import { InputAdornment, styled, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ISignUp } from 'models/auth.models';
import { LoadingButton } from '@mui/lab';
import useAuth from 'hooks/useAuth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PasswordTextField from '../../components/PasswordTextField';
import { authFormTypes } from './Auth';
import { useSnackbar } from 'notistack';

const StyledForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '12px',
}));

interface ISignUpForm extends ISignUp {
  passwordSubmit: string;
}

const initialValues: ISignUpForm = {
  username: '',
  password: '',
  lastName: '',
  firstName: '',
  passwordSubmit: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('username is required'),
  lastName: Yup.string().required('last name is required'),
  firstName: Yup.string().required('first name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('password is required'),
  passwordSubmit: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('submit your password'),
});

const SignUp = ({ handleTabChange }: { handleTabChange: (value: authFormTypes) => void }) => {
  const { signup } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async ({ password, lastName, firstName, username }: ISignUpForm) => {
    setLoading(true);

    const response = await signup({ password, lastName, firstName, username });
    if (response?.status) {
      enqueueSnackbar(response.message, { variant: 'success' });
      handleTabChange('login');
    }

    setLoading(false);
  };

  return (
    <>
      <Typography className="title" variant={'h2'}>Sign Up</Typography>

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
            handleBlur,
            handleChange,
            handleSubmit,
          }) => {
          return (
            <StyledForm onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="text"
                size="small"
                name="firstName"
                variant="outlined"
                onBlur={handleBlur}
                placeholder="First name"
                onChange={handleChange}
                value={values.firstName}
                helperText={touched.firstName && errors.firstName}
                error={Boolean(errors.firstName && touched.firstName)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                type="text"
                size="small"
                name="lastName"
                variant="outlined"
                onBlur={handleBlur}
                placeholder="Last name"
                value={values.lastName}
                onChange={handleChange}
                helperText={touched.lastName && errors.lastName}
                error={Boolean(errors.lastName && touched.lastName)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />

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
                autoComplete="new-username"
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
                helperText={touched.password && errors.password}
                error={Boolean(errors.password && touched.password)}
              />

              <PasswordTextField
                name="passwordSubmit"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.passwordSubmit}
                placeholder="Submit password"
                helperText={touched.passwordSubmit && errors.passwordSubmit}
                error={Boolean(errors.passwordSubmit && touched.passwordSubmit)}
              />

              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
              >
                Sign up
              </LoadingButton>
            </StyledForm>
          );
        }}
      </Formik>
    </>
  );
};

export default SignUp;
