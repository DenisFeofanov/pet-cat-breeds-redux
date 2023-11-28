"use client";

import Pagination from "@/components/Pagination";
import { fetchCats } from "@/lib/redux/catsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cats() {
  const cats = useAppSelector(state => state.cats.data);
  const status = useAppSelector(state => state.cats.status);
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
  const succeeded = status === "success";
  const catsContent = isLoading ? (
    <p className="mt-4">Loading...</p>
  ) : (
    cats &&
    cats.map(cat => {
      return (
        <section className="flex gap-5 items-center mt-4" key={cat.id}>
          {cat.image?.url ? (
            <Image
              className="max-w-xs"
              src={cat.image.url}
              width={cat.image.width}
              height={cat.image.height}
              alt="Cat image"
            />
          ) : (
            <p>no image found</p>
          )}

          <h3 className="text-xl">{cat.name}</h3>
        </section>
      );
    })
  );
  const pagination = succeeded && (
    <Pagination
      page={page}
      onPreviousClick={() => changePageBy(-1)}
      onNextClick={() => changePageBy(1)}
    />
  );

  return (
    <div className="p-10">
      {catsContent}

      {pagination}
    </div>
  );
}
