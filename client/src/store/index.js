import { configureStore } from '@reduxjs/toolkit';
import polygonsReducer from './polygonsSlice';
import objectsReducer from './objectsSlice';

export const store = configureStore({
  reducer: { polygons: polygonsReducer, objects: objectsReducer },
});
