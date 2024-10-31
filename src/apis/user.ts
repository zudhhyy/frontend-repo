import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { User } from '@/store/slicers/userSlice';

export const fetchUserData = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/fetch-user-data/${userId}`);

    if (data.success) {
      return data.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);

        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateUserData = async (newDataUser: User) => {
  try {
    const res = await axiosInstance.patch(`/api/update-user-data/${newDataUser.id}`, {
      email: newDataUser.email,
      name: newDataUser.name,
      address: newDataUser.address,
    });

    console.log(res.data.data);

    if (res.data.success) {
      return res.data.data;
    } else {
      throw new Error('Failed to update user data');
    }
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);

        throw new Error('Failed to update user data');
      }
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
