export const extractQueryPage = (url: string) =>
  url === null ? null : new URL(url).searchParams.get("page");
