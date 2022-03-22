import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSlice {
  isLogin: boolean;
}

const initialState: AuthSlice = {
  isLogin: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<AuthSlice["isLogin"]>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLogin } = authSlice.actions;

export default authSlice;
