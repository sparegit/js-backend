import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import customerReducer from "../features/customer/customerSlice";
import productReducer from "../features/product/productSlice";
import blogReducer from "../features/Blogs/blogSlice";
import pCategoryReducer from "../features/pCategory/pCategorySlice";
import uploadReducer from "../features/upload/uploadSlice";
import colorReducer from "../features/color/colorSlice";
import brandReducer from "../features/brand/brandSlice";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'
export const store = configureStore({
    reducer:{auth: authReducer,
             customer: customerReducer,
             products : productReducer,
             blogs : blogReducer,
             productCategories: pCategoryReducer,
             upload: uploadReducer,
             colors:colorReducer,
             brands: brandReducer},
    //  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
   
});