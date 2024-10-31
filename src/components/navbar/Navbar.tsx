import { Logout } from '@mui/icons-material';
import { Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slicers/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography color="primary">Ebuddy</Typography>

      <Button onClick={handleLogout} sx={{ border: 1 }} color="error">
        <Logout />
      </Button>
    </Container>
  );
};

export default Navbar;
