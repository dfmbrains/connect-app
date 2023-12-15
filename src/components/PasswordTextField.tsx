import React, { FC, InputHTMLAttributes } from 'react';
import { IconButton, InputAdornment, InputBaseProps, TextField } from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IPasswordTextField extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  handleBlur?: InputBaseProps['onBlur'];
  helperText?: string | false | undefined;
  handleChange?: (e: React.ChangeEvent<any>) => void;
}

const PasswordTextField: FC<IPasswordTextField> = ({
                                                     autoComplete,
                                                     placeholder,
                                                     name,
                                                     handleBlur,
                                                     value,
                                                     handleChange,
                                                     helperText,
                                                     error,
                                                   }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <TextField
      fullWidth
      name={name}
      size="small"
      value={value}
      error={error}
      variant="outlined"
      onBlur={handleBlur}
      onChange={handleChange}
      helperText={helperText}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      autoComplete={autoComplete || 'new-password'}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlineIcon color="secondary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
            <IconButton title={showPassword ? 'Hide password' : 'Show password'} size="small"
                        color="secondary" onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextField;