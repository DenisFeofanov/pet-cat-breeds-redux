import { Character } from "@/interfaces/Character";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  characters: Character[];
  status: "idle" | "isFetching" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  status: "idle",
  characters: [],
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (search: string | null) => {
    const { data } = await axios("https://swapi.dev/api/people", {
      params: {
        search,
      },
    });

    return data.results;
  }
);

const charactersSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, state => {
      state.status = "isFetching";
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.characters = action.payload;
    });
    builder.addCase(fetchCharacters.rejected, state => {
      state.status = "failed";
    });
  },
});

export default charactersSlice.reducer;
