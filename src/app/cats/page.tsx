"use client";

import loadingGif from "@/../public/loadingAnimation.webp";
import Pagination from "@/components/Pagination";
import { fetchCats } from "@/lib/redux/catsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cats() {
  const cats = useAppSelector(state => state.cats.data.breeds);
  const status = useAppSelector(state => state.cats.status);
  const pagesAmount = useAppSelector(state => state.cats.data.pagesAmount);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCats({ page }));
  }, [dispatch, page]);

  function changePageBy(amount: number) {
    const newPage = page + amount;
    setPage(newPage);
    dispatch(fetchCats({ page: newPage }));
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
                alt="Cat image"
                priority
              />
            ) : (
              <p>no image found</p>
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
      page={page}
      onPreviousClick={() => changePageBy(-1)}
      onNextClick={() => changePageBy(1)}
      pagesAmount={pagesAmount}
    />
  );
  const error = status === "failed" && (
    <p className="my-4">Something went wrong...</p>
  );
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
      <header className="border-b border-black">{pagination}</header>

      {error}
      {loadingIndicator}

      {catsContent}
    </>
  );
}
