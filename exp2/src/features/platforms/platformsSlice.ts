import { createSlice } from "@reduxjs/toolkit";

interface PlatformsState {
  platforms: string[];
}

const initialState: PlatformsState = {
  platforms: ["Instagram", "Facebook", "LinkedIn"],
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
});

export default platformsSlice.reducer;