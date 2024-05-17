/**
 * This is the API for the THBD API. It makes requests to the THBD API. Returns the response from the THBD API.
 */
import Axios from "axios";
import { z } from "zod";
import { Genre, Language, Movie } from "@/types/tmdbTypes";

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

export async function getGenres(): Promise<Genre[]> {
  const response = await axios.get(`/genre/movie/list`, {
    headers,
  });

  return z.array(z.object({ id: z.number(), name: z.string() })).parse(response.data.genres);
}

export async function getLanguages(): Promise<Language[]> {
  const response = await axios.get(`/configuration/languages`, {
    headers,
  });

  return z.array(z.object({ iso_639_1: z.string(), english_name: z.string(), name: z.string() })).parse(response.data);
}

export type GetMoviesParams = {
  with_genres?: string;
  with_original_language?: string;
  page?: number;
};

type getMoviesResponse = {
  movies: Movie[];
  totalResults: number;
};

export async function getMovies(params: GetMoviesParams): Promise<getMoviesResponse> {
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

  const totalResults = typeof response.data.total_results === "number" ? response.data.total_results : 0;

  return { movies, totalResults };
}
