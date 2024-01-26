import { ResponseHeaders, Result } from "@/interfaces/Api";
import { Breed } from "@/interfaces/Cat";
import { BREEDS_PER_PAGE } from "@/lib/constants";
import { extractPagesAmount } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catsApi = createApi({
  reducerPath: "catsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1",
    prepareHeaders: headers => {
      headers.set(
        "x-api-key",
        "live_NkLnCdw5YN4CH2KqCin2ZJRVGqqbNfnejhEdL4ltNVsPSvKYrGBgFByFuiasar7r"
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    getBreeds: builder.query<Result, { page: number }>({
      query: ({ page = 1 }) => ({
        url: `/breeds`,
        params: {
          limit: BREEDS_PER_PAGE,
          // first page in API is 0
          page: page - 1,
        },
        headers: {
          accept: "application/json",
        },
      }),
      transformResponse(apiResponse: Breed[], meta) {
        const headers = meta?.response?.headers as ResponseHeaders;

        return {
          breeds: apiResponse,
          pagesAmount: extractPagesAmount(headers),
        };
      },
    }),
    searchBreeds: builder.query<Result, string>({
      query: search => ({
        url: `/breeds/search`,
        params: {
          limit: BREEDS_PER_PAGE,
          q: search,
        },
      }),
      transformResponse(apiResponse: Breed[]) {
        const pagesAmount = Math.ceil(apiResponse.length / BREEDS_PER_PAGE);
        return {
          breeds: apiResponse,
          pagesAmount,
        };
      },
    }),
  }),
});

export const { useGetBreedsQuery, useSearchBreedsQuery } = catsApi;
