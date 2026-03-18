import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateCredits: (state, action) => {
      if (state.userData) {
        state.userData.credits = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, updateCredits } = userSlice.actions;

export default userSlice.reducer;
