import { Character } from "@/interfaces/Character";
import { Pages } from "@/interfaces/Pages";
import { Query } from "@/interfaces/Query";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { extractQueryPage } from "./utils";

interface State {
  characters: Character[];
  status: "idle" | "isFetching" | "succeeded" | "failed";
  error: string | null;
  pages: Pages;
}

const initialState: State = {
  status: "idle",
  characters: [],
  error: null,
  pages: { previous: null, next: null },
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ search, page }: Query) => {
    const { data } = await axios("https://swapi.dev/api/people", {
      params: {
        search,
        page,
      },
    });

    return data;
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
    builder.addCase(
      fetchCharacters.fulfilled,
      (
        state,
        { payload: { results, next: nextPageUrl, previous: previousPageUrl } }
      ) => {
        state.status = "succeeded";
        state.characters = results;
        state.pages.next = extractQueryPage(nextPageUrl);
        state.pages.previous = extractQueryPage(previousPageUrl);
      }
    );
    builder.addCase(fetchCharacters.rejected, state => {
      state.status = "failed";
    });
  },
});

export default charactersSlice.reducer;
