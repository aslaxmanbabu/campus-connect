import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationList: [],
  loading: false,
  error: null,
  response: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.applicationList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getRequest, getSuccess, getFailed, getError } =
  applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;
