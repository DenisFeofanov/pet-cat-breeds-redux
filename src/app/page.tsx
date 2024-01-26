"use client";

import { BreedsList } from "@/components/BreedsList";
import InfoMessage from "@/components/InfoMessage";
import { Loading } from "@/components/Loading";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import {
  useGetBreedsQuery,
  useSearchBreedsQuery,
} from "@/lib/redux/services/cats";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

export default function Cats() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const {
    currentData: searchedBreeds,
    isFetching: isFetchingSearch,
    isError: isSearchError,
    isUninitialized,
  } = useSearchBreedsQuery(search === null ? skipToken : { search });
  const isSearching = !isUninitialized;
  const {
    data: { pagesAmount: mainPagesAmount } = {},
    currentData: { breeds } = {},
    error,
    isFetching,
    isError,
  } = useGetBreedsQuery(isSearching ? skipToken : { page });

  function changePageBy(amount: number) {
    setPage(page + amount);
  }

  function handleSearch(text: string | null) {
    setPage(1);
    setSearch(text);
  }

  const content = isSearching ? searchedBreeds : breeds;
  const pagesAmount = (isSearching ? 1 : mainPagesAmount) || 1;
  let errorMessage: string | null = null;
  if (isError || isSearchError) {
    console.error(error);
    errorMessage = "Something went wrong...";
  }

  return (
    <div className="px-6 md:px-12">
      <header className="border-b border-black flex justify-between items-center gap-4 py-6">
        <Pagination
          page={page}
          onPreviousClick={() => changePageBy(-1)}
          onNextClick={() => changePageBy(1)}
          pagesAmount={pagesAmount}
        />
        <Search onSearch={handleSearch} />
      </header>

      <section className="py-12">
        <InfoMessage>{errorMessage}</InfoMessage>

        <Loading isLoading={isFetching || isFetchingSearch} />

        {content?.length === 0 && (
          <InfoMessage>
            {search ? "No breeds found for this search" : "No breeds found"}
          </InfoMessage>
        )}

        {content && <BreedsList breeds={content} />}
      </section>
    </div>
  );
}
