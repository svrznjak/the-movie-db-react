import { z } from "zod";

// Genre
export const genreSchema = z.object({ id: z.number(), name: z.string() });
export const genresSchema = z.array(genreSchema);

export type Genre = z.infer<typeof genreSchema>;

// Language
export const languageSchema = z.object({ iso_639_1: z.string(), english_name: z.string(), name: z.string() });
export const languagesSchema = z.array(languageSchema);

export type Language = z.infer<typeof languageSchema>;

// Movie
export const movieSchema = z.object({
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
});

export const moviesSchema = z.array(movieSchema);

export type Movie = z.infer<typeof movieSchema>;
