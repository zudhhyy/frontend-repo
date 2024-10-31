import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { loginUser } from '@/store/slicers/userSlice';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const [userData, setUserData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await dispatch(loginUser(userData));

      if (res.payload.id) {
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (error) setError('');

    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography
        sx={{
          color: 'primary.main',
          fontSize: { xs: '26px', sm: '36px', md: '48px' },
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Login
      </Typography>
      <TextField label="Email" name="email" value={userData.email} onChange={handleInputChange} fullWidth margin="normal" sx={{ mb: 2 }} />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={userData.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2, minWidth: 120 }} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
