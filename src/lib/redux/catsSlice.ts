import { Cat } from "@/interfaces/Cat";
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./createAppAsyncThunk";
import axios from "axios";

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

export const fetchCats = createAppAsyncThunk("cats/fetchCats", async () => {
  const { data } = await axios(
    "https://api.thecatapi.com/v1/breeds?limit=10&page=0",
    {
      headers: {
        "x-api-key":
          "live_NkLnCdw5YN4CH2KqCin2ZJRVGqqbNfnejhEdL4ltNVsPSvKYrGBgFByFuiasar7r",
      },
    }
  );

  return data as Cat[];
});

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
