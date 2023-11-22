"use client";

import Card from "@/components/Card";
import InfoMessage from "@/components/InfoMessage";
import PaginationButton from "@/components/PaginationButton";
import Search from "@/components/Search";
import { Query } from "@/interfaces/Query";
import { fetchCharacters } from "@/lib/charactersSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function Home() {
  const [query, setQuery] = useState<Query>({ search: null, page: null });
  const fetchStatus = useAppSelector(state => state.characters.status);
  const characters = useAppSelector(state => state.characters.characters);
  const pages = useAppSelector(state => state.characters.pages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters(query));
  }, [dispatch, query]);

  // useEffect(() => {
  //   let ignore = false;

  //   const startFetching = async () => {
  //     setIsError(false);
  //     setIsFetching(true);

  //     try {
  //       const { data } = await axios(url, {
  //         params: {
  //           search,
  //         },
  //       });

  //       if (!ignore) {
  //         const { previous, next } = data;

  //         setData({
  //           characters: data.results,
  //           paginationUrls: { previous, next },
  //         });
  //       }
  //     } catch (error) {
  //       setIsError(true);
  //       console.log(error);
  //     }

  //     setIsFetching(false);
  //   };

  //   startFetching();

  //   return () => {
  //     ignore = true;
  //     setIsFetching(false);
  //   };
  // }, [url, search]);

  function handleSetQuery(newQuery: Query) {
    // reset pagination on query change
    if (!newQuery.hasOwnProperty("page")) {
      newQuery.page = null;
    }

    setQuery({ ...query, ...newQuery });
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
        <div className="flex gap-2">
          <PaginationButton
            onClick={() =>
              pages.previous && handleSetQuery({ page: pages.previous })
            }
            disabled={!pages.previous}
          >
            Previous page
          </PaginationButton>

          <PaginationButton
            onClick={() => pages.next && handleSetQuery({ page: pages.next })}
            disabled={!pages.next}
          >
            Next page
          </PaginationButton>
        </div>
      )}
    </main>
  );
}
