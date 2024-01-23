import { Breed } from "@/interfaces/Cat";
import { Query } from "@/interfaces/Query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ResponseHeaders extends Headers {
  "pagination-count": string;
  "pagination-page": string;
  "pagination-limit": string;
}

interface Result {
  cats: Breed[];
  pagesAmount: number;
}

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
    getBreeds: builder.query<Result, Query>({
      query: ({ page = 1, search }) => ({
        url: `/breeds${search ? "/search" : ""}`,
        params: {
          limit: "5",
          // first page in API is 0
          page: page - 1,
          q: search,
        },
        headers: {
          accept: "application/json",
        },
      }),
      transformResponse(apiResponse: Breed[], meta) {
        const headers = meta?.response?.headers as ResponseHeaders;

        const pagesAmount = Math.ceil(
          Number(headers.get("pagination-count")) /
            Number(headers.get("pagination-limit"))
        );

        return { cats: apiResponse, pagesAmount };
      },
    }),
  }),
});

export const { useGetBreedsQuery } = catsApi;
