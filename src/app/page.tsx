"use client";

import Card from "@/components/Card";
import InfoMessage from "@/components/InfoMessage";
import PaginationButton from "@/components/PaginationButton";
import Search from "@/components/Search";
import { Character as CharacterInterface } from "@/interfaces/Character";
import axios from "axios";
import { useEffect, useState } from "react";

interface PaginationUrls {
  previous: string | null;
  next: string | null;
}

const BASE_URL = "https://swapi.dev/api/people";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [paginationUrls, setPaginationUrls] = useState<PaginationUrls>({
    previous: null,
    next: null,
  });
  const [url, setUrl] = useState(BASE_URL);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      setIsError(false);
      setIsFetching(true);

      try {
        const { data } = await axios(url, {
          params: {
            search,
          },
        });

        if (!ignore) {
          const { previous, next } = data;

          setPaginationUrls({ previous, next });
          setCharacters(data.results);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      }

      setIsFetching(false);
    };

    startFetching();

    return () => {
      ignore = true;
      setIsFetching(false);
    };
  }, [url, search]);

  const charactersAreReady = !isFetching && characters.length > 0;
  const isSearchEmpty = !isFetching && search;

  return (
    <main className="min-h-screen p-24 flex flex-col justify-between ">
      <div>
        <header className="flex justify-between">
          <h1 className="font-bold text-5xl">Star Wars characters</h1>

          <Search onSearch={setSearch} />
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
              paginationUrls.previous && setUrl(paginationUrls.previous)
            }
            disabled={!paginationUrls.previous}
          >
            Previous page
          </PaginationButton>
          <PaginationButton
            onClick={() => paginationUrls.next && setUrl(paginationUrls.next)}
            disabled={!paginationUrls.next}
          >
            Next page
          </PaginationButton>
        </div>
      )}
    </main>
  );
}
