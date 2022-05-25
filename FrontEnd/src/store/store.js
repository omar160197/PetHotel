import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import  bookSlice  from './bookings/bookingSlice';
import graphqlUserSlice from './graphqlUser/graphqlUserSlice';
import petSlice from './pets/petSlice'


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user:graphqlUserSlice,
    pets:petSlice,
    bookings:bookSlice
  },
});
