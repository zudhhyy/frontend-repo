import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';

import { AppDispatch, RootState } from '@/store/store';
import { fetchUser } from '@/store/slicers/userSlice';

import Loading from '@/components/loading/Loading';
import ErrorText from '@/components/text/ErrorText';
import TitleText from '@/components/text/TitleText';
import Navbar from '@/components/navbar/Navbar';
import UpdateButton from '@/components/buttons/updateButton';

const MainPage = () => {
  const router = useRouter();

  const { data, loading, error, isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [newUserData, setNewUserData] = useState({
    id: data?.id || '',
    email: data?.email || '',
    name: data?.name || '',
    address: data?.address || '',
  });

  const handleFetchData = () => {
    if (data) {
      dispatch(fetchUser(data.id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <Container>
      <Navbar />
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <TitleText text="Ebuddy Technical Test" />

        {loading && <Loading message="Loading fetch user data..." />}

        {error && <ErrorText message={error} />}

        {data && (
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontSize: { xs: 20, sm: 26, md: 32 }, fontWeight: 'bold', mb: 2 }}>User Information</Typography>
            <Typography>Email: {data.email}</Typography>
            <Typography>Name: {data.name}</Typography>
            <Typography>Address: {data.address}</Typography>
          </Box>
        )}

        <Button variant="contained" color="primary" onClick={handleFetchData} sx={{ mt: 4 }}>
          Refresh Data
        </Button>

        {!loading && (
          <Box sx={{ mt: 3 }}>
            <TextField label="Email" name="email" value={newUserData.email} onChange={handleInputChange} margin="normal" />
            <TextField label="Name" name="name" value={newUserData.name} onChange={handleInputChange} margin="normal" />
            <TextField label="Address" name="address" value={newUserData.address} onChange={handleInputChange} margin="normal" />

            <UpdateButton newUserData={newUserData} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MainPage;
