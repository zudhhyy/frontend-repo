import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading....' }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 4,
      }}
    >
      <CircularProgress sx={{ color: 'warning.main' }} />
      <Typography
        sx={{
          mt: 2,
          color: 'text.secondary',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
