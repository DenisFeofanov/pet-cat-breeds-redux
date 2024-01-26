"use client";

import { BreedsList } from "@/components/BreedsList";
import InfoMessage from "@/components/InfoMessage";
import { Loading } from "@/components/Loading";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { Breed } from "@/interfaces/Cat";
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
    data: { breeds, pagesAmount: mainPagesAmount } = {},
    error,
    isFetching,
    isError,
    isSuccess,
  } = useGetBreedsQuery({ page });
  const {
    currentData: {
      breeds: searchedBreeds,
      pagesAmount: searchPagesAmount,
    } = {},
    isFetching: isSearching,
    isSuccess: hasSearched,
    isError: isSearchError,
  } = useSearchBreedsQuery(search ?? skipToken);

  function changePageBy(amount: number) {
    setPage(page + amount);
  }

  function handleSearch(text: string | null) {
    setSearch(text);
  }

  const isLoading = isFetching || isSearching;
  let content: Breed[] | null = null,
    pagesAmount = searchPagesAmount || mainPagesAmount || 1,
    errorMessage: JSX.Element | null = null;
  switch (true) {
    case isLoading:
      content = null;
      break;
    case hasSearched:
      content = searchedBreeds!;
      break;
    case isSuccess:
      content = breeds!;
      break;
    case isError || isSearchError:
      errorMessage = <InfoMessage>Something went wrong...</InfoMessage>;
      console.error(error);
      break;
    default:
      content = null;
      errorMessage = null;
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
        {errorMessage}
        <Loading isLoading={isLoading} />

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
