import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchValue {
  searchValue: string;
}

const initialState: SearchValue = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
