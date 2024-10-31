import { Typography } from '@mui/material';

interface ErrorTextProps {
  message?: string;
}

const ErrorText = ({ message = 'Unknown error' }: ErrorTextProps) => {
  return (
    <Typography
      sx={{
        my: 4,
        color: 'error.main',
        fontSize: { xs: '20px', sm: '26px', md: '32px' },
      }}
    >
      {message}
    </Typography>
  );
};

export default ErrorText;
