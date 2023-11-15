"use client";

import Card from "@/components/Card";
import { Character as CharacterInterface } from "@/interfaces/Character";
import { useEffect, useState } from "react";

const BASE_URL = "https://swapi.dev/api";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  function fetchCharacters() {
    let ignore = false;

    async function startFetching() {
      setIsFetching(true);
      const response = await fetch(`${BASE_URL}/people`);
      const parsedResponse = await response.json();

      if (!ignore) {
        setIsFetching(false);
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
    <main className="min-h-screen p-24">
      <h1 className="font-bold text-5xl">Star Wars characters</h1>

      <section className="mt-16">
        <button
          className="border hover:border-black p-2"
          type="button"
          onClick={fetchCharacters}
        >
          Reload characters
        </button>

        <ul className="mt-4">
          {isFetching ? (
            <p>Fetching users...</p>
          ) : (
            characters.map(character => (
              <li key={character.name} className="my-4">
                <Card character={character} />
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
