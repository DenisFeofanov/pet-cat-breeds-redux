"use client";

import placeholderImage from "@/../public/imagePlaceholder.svg";
import loadingGif from "@/../public/loadingAnimation.webp";
import Header from "@/components/Header";
import InfoMessage from "@/components/InfoMessage";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { Query } from "@/interfaces/Query";
import { fetchCats } from "@/lib/redux/catsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cats() {
  const cats = useAppSelector(state => state.cats.data.breeds);
  const status = useAppSelector(state => state.cats.status);
  const pagesAmount = useAppSelector(state => state.cats.data.pagesAmount);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<Query>({ search: null, page: 1 });

  useEffect(() => {
    dispatch(fetchCats(query));
  }, [dispatch, query]);

  function changePageBy(amount: number) {
    setQuery({ ...query, page: query.page + amount });
  }

  function handleSearch(text: string | null) {
    if (query.search === text) return;
    setQuery({ ...query, page: 1, search: text });
  }

  const isLoading = status === "isFetching";
  const catsContent = !isLoading && cats && (
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
      pagesAmount={query.search ? 1 : pagesAmount}
    />
  );
  let error;
  if (status === "failed") {
    error = <InfoMessage>Something went wrong...</InfoMessage>;
  } else if (query.search && cats.length === 0) {
    error = <InfoMessage>No breeds found</InfoMessage>;
  }
  const loadingIndicator = (
    <Image
      className={`${
        isLoading || status === "idle" ? "opacity-1" : "opacity-0"
      } transition-opacity duration-500 absolute top-0 left-0 right-0 bottom-0 m-auto -z-10`}
      src={loadingGif}
      alt="loading..."
      priority
    />
  );

  return (
    <>
      <Header>
        {pagination}
        <Search onSearch={handleSearch} />
      </Header>

      <section className="py-12 px-6 md:px-12">
      {error}
      {loadingIndicator}

      {catsContent}
      </section>
    </>
  );
}
