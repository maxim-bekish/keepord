import { configureStore} from "@reduxjs/toolkit";
import homePageReducer from "./slice";
import sliceDataItem from "./sliceDataItem";
import sliceAuth from "./sliceAuth";
export default configureStore({
  reducer: {
    homePageReducer: homePageReducer,
    sliceDataItem: sliceDataItem,
    sliceAuth: sliceAuth,
  },
});


// categoriesSlice;