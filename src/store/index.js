import { configureStore} from "@reduxjs/toolkit";
import homePageReducer from "./slice";
export default configureStore({
  reducer: {
    homePageReducer: homePageReducer,
  },
});