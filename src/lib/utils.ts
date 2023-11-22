export const extractQueryPage = (url: string) =>
  new URL(url).searchParams.get("page");
