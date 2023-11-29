import { Breed } from "@/interfaces/Cat";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAppAsyncThunk } from "./createAppAsyncThunk";

interface State {
  data: { breeds: Breed[]; pagesAmount: number };
  status: "idle" | "isFetching" | "success" | "failed";
  error: null | string;
}

const initialState: State = {
  data: { breeds: [], pagesAmount: 1 },
  status: "idle",
  error: null,
};

interface Query {
  page?: number;
}

type ResponseHeaders = {
  "pagination-count": string;
  "pagination-page": string;
  "pagination-limit": string;
};

export const fetchCats = createAppAsyncThunk(
  "cats/fetchCats",
  async ({ page = 1 }: Query) => {
    const response = await axios<Breed[]>("/breeds", {
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
    const data = response.data;
    const headers = response.headers as ResponseHeaders;
    const pagesAmount = Math.ceil(
      Number(headers["pagination-count"]) / Number(headers["pagination-limit"])
    );

    return { data, pagesAmount };
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
    builder.addCase(
      fetchCats.fulfilled,
      (state, { payload: { data, pagesAmount } }) => {
        state.status = "success";
        state.data.breeds = data;
        state.data.pagesAmount = pagesAmount;
      }
    );
    builder.addCase(fetchCats.rejected, (state, action) => {
      console.error(action);
      state.status = "failed";
    });
  },
});

export default catsSlice.reducer;
