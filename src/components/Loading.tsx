import Image from "next/image";
import loadingGif from "@/loadingAnimation.webp";

export function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <Image
      className={`${
        isLoading ? "opacity-1" : "opacity-0"
      } transition-opacity duration-500 absolute top-0 left-0 right-0 bottom-0 m-auto -z-10`}
      src={loadingGif}
      alt="loading..."
      priority
    />
  );
}
