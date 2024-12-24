import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebarSlice';
import studentsReducer from './features/studentsSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
