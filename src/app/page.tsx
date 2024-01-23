"use client";

import placeholderImage from "@/../public/imagePlaceholder.svg";
import loadingGif from "@/../public/loadingAnimation.webp";
import InfoMessage from "@/components/InfoMessage";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { Query } from "@/interfaces/Query";
import { useGetBreedsQuery } from "@/lib/redux/services/cats";
import Image from "next/image";
import { useState } from "react";

export default function Cats() {
  const [query, setQuery] = useState<Query>({ search: null, page: 1 });
  const {
    data: { cats, pagesAmount } = {},
    error,
    isFetching,
    isError,
  } = useGetBreedsQuery(query);

  function changePageBy(amount: number) {
    setQuery({ ...query, page: query.page + amount });
  }

  function handleSearch(text: string | null) {
    if (query.search === text) return;
    setQuery({ ...query, page: 1, search: text });
  }

  const catsContent = !isFetching && cats && (
    <ul className="flex flex-col gap-10 mt-12 md:grid md:grid-cols-3 md:gap-5 xl:grid-cols-5">
      {cats.map(cat => {
        return (
          <li key={cat.id}>
            {cat.image?.url ? (
              <Image
                src={cat.image.url}
                width={cat.image.width}
                height={cat.image.height}
                alt="Cat photo"
                priority
              />
            ) : (
              <Image src={placeholderImage} alt="Cat photo placeholder" />
            )}

            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-3xl">{cat.name}</h3>

              <p>
                <i>Key personality traits:</i>
                <br />
                {cat.temperament}
              </p>
              <p>
                <i>Description:</i>
                <br />
                {cat.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
  const pagination = (
    <Pagination
      page={query.page}
      onPreviousClick={() => changePageBy(-1)}
      onNextClick={() => changePageBy(1)}
      // force single page while searching, cause API doesn't search with pages
      pagesAmount={pagesAmount || 1}
    />
  );
  let errorMessage;
  if (isError) {
    errorMessage = <InfoMessage>Something went wrong...</InfoMessage>;
    console.error(error);
  } else if (query.search && cats?.length === 0) {
    errorMessage = <InfoMessage>No breeds found</InfoMessage>;
  }
  const loadingIndicator = (
    <Image
      className={`${
        isFetching ? "opacity-1" : "opacity-0"
      } transition-opacity duration-500 absolute top-0 left-0 right-0 bottom-0 m-auto -z-10`}
      src={loadingGif}
      alt="loading..."
      priority
    />
  );

  return (
    <div className="px-6 md:px-12">
      <header className="border-b border-black flex justify-between items-center gap-4 py-6">
        {pagination}
        <Search onSearch={handleSearch} />
      </header>

      <section className="py-12">
        {errorMessage}
        {loadingIndicator}

        {catsContent}
      </section>
    </div>
  );
}
