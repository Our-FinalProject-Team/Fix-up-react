import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // כאן תוסיפי בעתיד reducers נוספים (כמו משימות, הודעות וכו')
  },
});

// טיפוסים עבור TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;