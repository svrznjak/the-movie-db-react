/**
 * Hook wrappers for tmdb api calls
 */

import { GetMoviesParams, getGenres, getLanguages, getMovies } from "@/api/tmdb";
import { Genre, Language, Movie } from "@/types/tmdb";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useGenres() {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const genres = await getGenres();

        setGenres(genres);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
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

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const languages = await getLanguages();
        setLanguages(languages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
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

export function useMovies({
  page = 1,
  genreIds,
  language,
}: { page?: number; genreIds?: number[]; language?: string } = {}) {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { movies, totalResults } = await getMovies(params);

      setTotalResults(totalResults);
      setMovies(movies);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An error occurred: " + JSON.stringify(err)));
      }
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return [movies, totalResults, isLoading, error, fetchMovies] as const;
}
