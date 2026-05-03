import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  userRole: 'guest' | 'Client' | 'Professional';
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
  userRole: (localStorage.getItem('userRole') as any) || 'guest',
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // פעולת התחברות
    loginSuccess: (state, action: PayloadAction<{ role: 'Client' | 'Professional'; token: string }>) => {
      state.isLoggedIn = true;
      state.userRole = action.payload.role;
      state.token = action.payload.token;
      
      // שמירה ב-localStorage לסנכרון
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userRole', action.payload.role);
    },
    // פעולת התנתקות
    logout: (state) => {
      state.isLoggedIn = false;
      state.userRole = 'guest';
      state.token = null;
      
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;