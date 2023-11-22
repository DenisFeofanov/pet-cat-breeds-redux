import { Character } from "@/interfaces/Character";
import { Pages } from "@/interfaces/Pages";
import { Query } from "@/interfaces/Query";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAppAsyncThunk } from "./createAppAsyncThunk";
import { extractQueryPage } from "./utils";

interface ResponseData {
  results: Character[];
  next: string | null;
  previous: string | null;
}

interface State {
  data: Character[];
  status: "idle" | "isFetching" | "succeeded" | "failed";
  error: string | null;
  pages: Pages;
}

const initialState: State = {
  status: "idle",
  data: [],
  error: null,
  pages: { previous: null, next: null },
};

export const fetchCharacters = createAppAsyncThunk(
  "characters/fetchCharacters",
  async ({ search, page }: Query) => {
    const { data } = await axios("https://swapi.dev/api/people", {
      params: {
        search,
        page,
      },
    });

    return data as ResponseData;
  }
);

const charactersSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, state => {
      state.status = "isFetching";
      state.error = null;
    });
    builder.addCase(
      fetchCharacters.fulfilled,
      (
        state,
        { payload: { results, next: nextPageUrl, previous: previousPageUrl } }
      ) => {
        state.status = "succeeded";
        state.data = results;
        state.pages.next = nextPageUrl && extractQueryPage(nextPageUrl);
        state.pages.previous =
          previousPageUrl && extractQueryPage(previousPageUrl);
      }
    );
    builder.addCase(fetchCharacters.rejected, state => {
      state.status = "failed";
    });
  },
});

export default charactersSlice.reducer;
