import { Cat } from "@/interfaces/Cat";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAppAsyncThunk } from "./createAppAsyncThunk";

interface State {
  data: Cat[];
  status: "idle" | "isFetching" | "success" | "failed";
  error: null | string;
}

const initialState: State = {
  data: [],
  status: "idle",
  error: null,
};

interface Query {
  page?: number;
}

export const fetchCats = createAppAsyncThunk(
  "cats/fetchCats",
  async ({ page = 1 }: Query) => {
    const { data } = await axios("/breeds", {
      baseURL: "https://api.thecatapi.com/v1",
      params: {
        limit: "5",
        // first page in API is 0
        page: page - 1,
      },
      headers: {
        "x-api-key":
          "live_NkLnCdw5YN4CH2KqCin2ZJRVGqqbNfnejhEdL4ltNVsPSvKYrGBgFByFuiasar7r",
      },
    });

    return data as Cat[];
  }
);

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCats.pending, state => {
      state.error = null;
      state.status = "isFetching";
    });
    builder.addCase(fetchCats.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });
    builder.addCase(fetchCats.rejected, state => {
      state.status = "failed";
    });
  },
});

export default catsSlice.reducer;
