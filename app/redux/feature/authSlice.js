import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import authStorage from "../../utils/storage"
import { PURGE } from "redux-persist";

const initialState = {
  isAuthenticated:false,
  isLoading: true,
  token:null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state,action) => {
      state.isAuthenticated = true;
      state.token = action.payload
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null

    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers:(builder) =>{
    builder.addCase(PURGE,(state) =>{
      state.isAuthenticated = false
    })
  }
});

export const storeToken = (token) => async (dispatch) =>{
  try {
    await SecureStore.setItemAsync('authToken', token);
    dispatch(setAuth(token))
  } catch (error) {
    console.error('Error storing token:', error);
  }
}
export const clearToken = () => async (dispatch) =>{
  try {
    await SecureStore.deleteItemAsync('authToken');
    dispatch(logout())
  } catch (error) {
    console.error('Error storing token:', error);
  }
}


export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
