import { atom } from "recoil";

import { CountryData } from "./types";

export const countriesAtom = atom<CountryData[] | null>({
  key: 'countries',
  default: null,
});
