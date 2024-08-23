import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    isLoading : false
}
const loaderSlice = createSlice({
    name: 'loader',
    initialState: initialState,
    reducers: {
      showLoader: (state) => {
        state.isLoading = true;
      },
      hideLoader: (state) => {
        state.isLoading = false;
      },
    },
  });
export default loaderSlice.reducer
export const {showLoader,hideLoader} = loaderSlice.actions