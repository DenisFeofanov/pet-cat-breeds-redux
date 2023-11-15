"use client";

import Card from "@/components/Card";
import PaginationButton from "@/components/PaginationButton";
import { Character as CharacterInterface } from "@/interfaces/Character";
import { useEffect, useState } from "react";

interface PaginationURLs {
  previous: string | null;
  next: string | null;
}

const BASE_URL = "https://swapi.dev/api";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [paginationURLs, setPaginationURLs] = useState<PaginationURLs>({
    previous: null,
    next: null,
  });

  function fetchCharacters(URL: string = `${BASE_URL}/people`) {
    let ignore = false;

    async function startFetching() {
      setIsFetching(true);
      // throw error
      const response = await fetch(URL);
      // throw error
      const parsedResponse = await response.json();

      if (!ignore) {
        const { previous, next } = parsedResponse;

        setIsFetching(false);
        setPaginationURLs({ previous, next });
        setCharacters(parsedResponse.results);
      }
    }

    startFetching();

    return () => {
      ignore = true;
      setIsFetching(false);
    };
  }

  useEffect(fetchCharacters, []);

  return (
    <main className="min-h-screen p-24 flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-5xl">Star Wars characters</h1>

        {isFetching ? (
          <h3 className="mt-16">Fetching users...</h3>
        ) : (
          <>
            <button
              className="border hover:border-black p-2 mt-16"
              type="button"
              onClick={() => fetchCharacters()}
            >
              Reload characters
            </button>

            <ul className="mt-4">
              {characters.map(character => (
                <li key={character.name} className="my-4">
                  <Card character={character} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {!isFetching && (
        <div className="flex gap-2">
          <PaginationButton
            onClick={() =>
              paginationURLs.previous &&
              fetchCharacters(paginationURLs.previous)
            }
            disabled={!paginationURLs.previous}
          >
            Previous page
          </PaginationButton>
          <PaginationButton
            onClick={() =>
              paginationURLs.next && fetchCharacters(paginationURLs.next)
            }
            disabled={!paginationURLs.next}
          >
            Next page
          </PaginationButton>
        </div>
      )}
    </main>
  );
}
