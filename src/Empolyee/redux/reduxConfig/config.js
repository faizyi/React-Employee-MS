import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from '../../../Empolyee/redux/loaderSlice/loaderSlice'
export const store = configureStore({
    reducer : {
        loader : loaderReducer
    }
})