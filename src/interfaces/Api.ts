import { Breed } from "./Cat";

export interface ResponseHeaders extends Headers {
  "pagination-count": string;
  "pagination-page": string;
  "pagination-limit": string;
}

export interface Result {
  breeds: Breed[];
  pagesAmount: number;
}
