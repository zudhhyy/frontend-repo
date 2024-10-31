import React from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { User, updateUser } from '@/store/slicers/userSlice';
import { AppDispatch, RootState } from '@/store/store';

interface UpdateButtonProps {
  newUserData: User;
}

const UpdateButton = ({ newUserData }: UpdateButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleUpdateData = async () => {
    await dispatch(updateUser(newUserData));
  };

  return (
    <div>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="warning" onClick={handleUpdateData}>
        Update
      </Button>
    </div>
  );
};

export default UpdateButton;
