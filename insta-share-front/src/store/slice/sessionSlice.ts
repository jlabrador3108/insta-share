import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  key: { token: string } | null,
}

const initialState: InitialState = {
  key: null
}

const sessionSlice = createSlice({
  initialState,
  name: "session",
  reducers: {
    setKeys: (state, action) => {
      return { ...state, key: action.payload }
    }
  },
}
);

export const { setKeys } = sessionSlice.actions;
export default sessionSlice.reducer