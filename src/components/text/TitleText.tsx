import { Typography } from '@mui/material';

interface TitleTextProps {
  text: string;
}

const TitleText = ({ text, ...props }: TitleTextProps) => {
  return (
    <Typography
      {...props}
      sx={{
        color: 'primary.main',
        fontSize: { xs: '26px', sm: '36px', md: '48px' },
        fontWeight: 'bold',
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {text}
    </Typography>
  );
};

export default TitleText;
