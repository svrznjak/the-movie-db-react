/**
 * This is the API for the THBD API. It makes requests to the THBD API. Returns the response from the THBD API.
 */

import { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { z } from "zod";

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const axios = Axios.create({ baseURL: "https://api.themoviedb.org/3" });

/**
 * TODO: Implement caching
 * ERROR: CORS error PreflightMissingAllowOriginHeader

import { setupCache } from "axios-cache-interceptor";
const axiosWithCache = setupCache(axios);
*/

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

export type Genre = {
  id: number;
  name: string;
};
export function useGenres() {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/genre/movie/list`, {
          headers,
        });

        const genres: Genre[] = z.array(z.object({ id: z.number(), name: z.string() })).parse(response.data.genres);

        setGenres(genres);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);
        else {
          setError(new Error("An error occurred: " + JSON.stringify(err)));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return [genres, isLoading, error] as const;
}

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/configuration/languages`, {
          headers,
        });

        const languages: Language[] = z
          .array(z.object({ iso_639_1: z.string(), english_name: z.string(), name: z.string() }))
          .parse(response.data);

        setLanguages(languages);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);
        else {
          setError(new Error("An error occurred: " + JSON.stringify(err)));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return [languages, isLoading, error] as const;
}

export type GetMoviesParams = {
  with_genres?: string;
  with_original_language?: string;
  page?: number;
};
export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export function useMovies({
  page = 1,
  genreIds,
  language,
}: { page?: number; genreIds?: number[]; language?: string } = {}) {
  const params = useMemo(() => {
    const params: GetMoviesParams = {};
    if (genreIds !== undefined && Array.isArray(genreIds) && genreIds.length > 0) {
      params["with_genres"] = genreIds.join(",");
    }
    if (language !== undefined) {
      params["with_original_language"] = language.toString();
    }
    params["page"] = page;
    return params;
  }, [page, genreIds, language]);

  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/discover/movie`, { headers, params });

        const movies: Movie[] = z
          .array(
            z.object({
              adult: z.boolean(),
              backdrop_path: z.string().nullable(),
              genre_ids: z.array(z.number()),
              id: z.number(),
              original_language: z.string(),
              original_title: z.string(),
              overview: z.string(),
              popularity: z.number(),
              poster_path: z.string().nullable(),
              release_date: z.string(),
              title: z.string(),
              video: z.boolean(),
              vote_average: z.number(),
              vote_count: z.number(),
            })
          )
          .parse(response.data.results);

        console.log(movies);

        setMovies(movies);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setError(err);
        else {
          setError(new Error("An error occurred: " + JSON.stringify(err)));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [params]);

  return { movies, isLoading, error };
}
