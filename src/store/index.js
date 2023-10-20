import { configureStore} from "@reduxjs/toolkit";
import homePageReducer from "./slice";
import sliceTest from "./sliseTest";
export default configureStore({
  reducer: {
    homePageReducer: homePageReducer,
    sliceTest: sliceTest,
  },
});


// categoriesSlice;