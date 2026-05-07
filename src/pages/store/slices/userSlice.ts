
interface BaseUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface Professional extends BaseUser {
  role: 'Professional'; 
  specialty: string;
  averageRating: number;
  totalReviews: number;
  categoryId: number;
  baseHourlyRate: number;
  callOutFee: number;
}

interface Client extends BaseUser {
  role: 'Client';
  myRequests: any[]; 
}

type User = Professional | Client;

interface UserState {
  currentUser: User | null;
}


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;