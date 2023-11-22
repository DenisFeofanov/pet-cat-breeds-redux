"use client";

import Card from "@/components/Card";
import InfoMessage from "@/components/InfoMessage";
import PaginationButton from "@/components/PaginationButton";
import Search from "@/components/Search";
import { Query } from "@/interfaces/Query";
import { fetchCharacters } from "@/lib/redux/charactersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<Query>({ search: null, page: null });
  const [currentPage, setCurrentPage] = useState("1");
  const fetchStatus = useAppSelector(state => state.characters.status);
  const characters = useAppSelector(state => state.characters.data);
  const pages = useAppSelector(state => state.characters.pages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const startFetching = async () => {
      try {
        await dispatch(fetchCharacters(query)).unwrap();
      } catch (error) {
        console.error(error);
      }
    };

    startFetching();
  }, [dispatch, query]);

  function handleSetQuery(newQuery: Query) {
    // reset pagination on query change
    if (!newQuery.hasOwnProperty("page")) {
      newQuery.page = null;
    }

    setQuery({ ...query, ...newQuery });
  }

  function handlePageChange(page: string) {
    setCurrentPage(page);
    return handleSetQuery({ page });
  }

  const isFetching = fetchStatus === "isFetching";
  const isError = fetchStatus === "failed";
  const charactersAreReady = !isFetching && characters.length > 0;
  const isSearchEmpty =
    !isFetching && Boolean(query.search) && characters.length === 0;

  return (
    <main className="min-h-screen p-24 flex flex-col justify-between ">
      <div>
        <header className="flex justify-between">
          <h1 className="font-bold text-5xl">Star Wars characters</h1>

          <Search onSearch={handleSetQuery} />
        </header>

        {isFetching && <InfoMessage>Fetching users...</InfoMessage>}

        {isError && <InfoMessage>Something went wrong...</InfoMessage>}

        {isSearchEmpty && <InfoMessage>No character found...</InfoMessage>}

        {charactersAreReady && (
          <>
            <ul className="mt-16">
              {characters.map(character => (
                <li key={character.name} className="my-4">
                  <Card character={character} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {charactersAreReady && (
        <div className="flex gap-2 items-center">
          <PaginationButton
            onClick={() => pages.previous && handlePageChange(pages.previous)}
            disabled={!pages.previous}
          >
            Previous page
          </PaginationButton>

          <span>{currentPage}</span>

          <PaginationButton
            onClick={() => pages.next && handlePageChange(pages.next)}
            disabled={!pages.next}
          >
            Next page
          </PaginationButton>
        </div>
      )}
    </main>
  );
}
