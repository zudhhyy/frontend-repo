import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData, updateUserData } from '@/apis/user';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axiosInstance from '@/utils/axiosInstance';
import { auth } from '@/config/firebaseConfig';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

interface LoginUserProps {
  email: string;
  password: string;
}

interface UpdateUserProps {
  id: string;
  email: string;
  name: string;
  address: string;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }: LoginUserProps, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken(true);

    if (idToken) {
      const res = await axiosInstance.post('/users/login', { idToken });

      if (res.data.success) {
        return res.data.data;
      } else {
        return rejectWithValue('Invalid login credentials');
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: string, { rejectWithValue }) => {
  try {
    const data = await fetchUserData(userId);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (newDataUser: UpdateUserProps, { rejectWithValue }) => {
  try {
    const data = await updateUserData(newDataUser);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.data = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      });
  },
});

export const { setUser, setUserLoading, setUserError, logout } = userSlice.actions;

export default userSlice.reducer;
