import { configureStore} from "@reduxjs/toolkit";
import categoriesReducer from './slice'
export default configureStore({
  reducer: {
    categoriesReducer: categoriesReducer,
  },
});