import { createSlice } from "@reduxjs/toolkit";

export interface Rider {
  id: string;
  name: String;
  status: string;
  location: {
    lat: Number;
    lng: Number;
  };
  lastActiveAt: Date;
}

export interface RiderState {
  rider: Rider | null;
}

const initialState: RiderState = {
  rider: null,
};

const riderSlice = createSlice({
  initialState,
  name: "rider",
  reducers: {
    authenticate(state, action) {
      state.rider = action.payload.rider;
    },
  },
});

export const { authenticate } = riderSlice.actions;
const riderReducer = riderSlice.reducer;

export default riderReducer;
