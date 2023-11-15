"use client";

import Card from "@/components/Card";
import PaginationButton from "@/components/PaginationButton";
import { Character as CharacterInterface } from "@/interfaces/Character";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

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
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(BASE_URL);

  const charactersAreReady = !isFetching && characters.length > 0;

  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      setIsFetching(true);

      try {
        const { data } = await axios(url);

        if (!ignore) {
          const { previous, next } = data;

          setIsFetching(false);
          setPaginationUrls({ previous, next });
          setCharacters(data.results);
        }
      } catch (error) {
        setIsFetching(false);
        console.log(error);
      }
    };

    startFetching();

    return () => {
      ignore = true;
      setIsFetching(false);
    };
  }, [url]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query) {
      setUrl(BASE_URL);
    } else {
      setUrl(`${BASE_URL}/?search=${query}`);
    }
  }

  return (
    <main className="min-h-screen p-24 flex flex-col justify-between ">
      <div>
        <header className="flex justify-between">
          <h1 className="font-bold text-5xl">Star Wars characters</h1>

          <form onSubmit={e => handleSearch(e)}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
            />
          </form>
        </header>

        {isFetching && <h3 className="mt-16">Fetching users...</h3>}

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
