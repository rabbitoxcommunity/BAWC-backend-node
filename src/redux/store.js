import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '../redux/commonReducer';

export default configureStore({
  reducer: {
    commonReducer: commonReducer,
  },
});