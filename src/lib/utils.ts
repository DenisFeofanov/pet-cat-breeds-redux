import { ResponseHeaders } from "@/interfaces/Api";

export const extractQueryPage = (url: string) =>
  new URL(url).searchParams.get("page");

export const extractPagesAmount = (headers: ResponseHeaders): number =>
  Math.ceil(
    Number(headers.get("pagination-count")) /
      Number(headers.get("pagination-limit"))
  );
