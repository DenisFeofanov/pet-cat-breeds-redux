"use client";

import { fetchCats } from "@/lib/redux/catsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import Image from "next/image";

export default function Cats() {
  const cats = useAppSelector(state => state.cats.data);
  const dispatch = useAppDispatch();

  const catsContent =
    cats &&
    cats.map(cat => {
      return (
        <section className="flex gap-5 items-center mt-4" key={cat.id}>
          <Image
            className="max-w-xs"
            src={cat.image.url}
            width={cat.image.width}
            height={cat.image.height}
            alt="Cat image"
          />

          <h3 className="text-xl">{cat.name}</h3>
        </section>
      );
    });

  return (
    <div className="p-10">
      <button type="button" onClick={() => dispatch(fetchCats())}>
        Fetch cats
      </button>

      {catsContent}
    </div>
  );
}
