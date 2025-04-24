import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { 
    name: string; 
    email: string 
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
