import MultipleSelectToggle from "@/components/common/MultipleSelectToggle";
import SearchSection from "@/components/SearchSection";
import MainWithSidebarLayout from "@/components/layout/MainWithSidebarLayout";
import { useEffect,useMemo,useState } from "react";
import Button from "@/components/common/Button";
import { useMovies, useGenres, useLanguages } from "@/hooks/useTmdb";
import MovieList, { MovieListSkeleton } from "@/components/MovieList";
import Pagination from "@/components/common/Pagination";
import Dropdown from "@/components/common/Dropdown";
import { getUrlParam, getUrlParamArray, setQueryParams } from "@/utils/urlHelper";
import { Genre } from "@/types/tmdbTypes";

export default function Movies() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>(getUrlParamArray("genres").map(Number)); // initial genres from URL
  const [selectedLanguage, setSelectedLanguage] = useState<string>(getUrlParam("language") || ""); // initial language from URL
  const [page, setPage] = useState(Number(getUrlParam("page") || "1"));
  const {movies, totalResults, isLoading, error} = useMovies({page: page, genreIds: selectedGenres, language: selectedLanguage});
  const totalPages = useMemo(()=>Math.ceil(totalResults / 20), [totalResults]);

  function handleSearch(genreIds: number[], language: string) {
    setSelectedGenres(genreIds); 
    setSelectedLanguage(language);
    setPage(1);

    // add query params to URL state
    setQueryParams({
      genres: genreIds.join(","),
      language: language,
      page: 1,
    });
  }

  function handleSetPage(newPage: number) {
    setPage(newPage);

    setQueryParams({
      page: newPage.toString(),
    });
  }

  function handleRouteChange() {
    setSelectedGenres(getUrlParamArray("genres").map(Number));
    setSelectedLanguage(getUrlParam("language") || "");
    setPage(Number(getUrlParam("page") || "1"));
  }

  useEffect(() => {
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);



  if(error) return <p>Error loading movies</p>; // This is not ideal, but it's fine for now

  // Display placeholder while loading
  if(isLoading || !movies){
    return (
      <MainWithSidebarLayout title="Movies" sidebar={<MovieFilter onSearch={handleSearch} />} >
        <MovieListSkeleton numberOfCards={20} />
      </MainWithSidebarLayout>
    )
  }

  return (
    <MainWithSidebarLayout title="Movies" sidebar={<MovieFilter onSearch={handleSearch} />} >
      <MovieList movies={movies} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handleSetPage} />
    </MainWithSidebarLayout>
  );
}


function MovieFilter({onSearch}: {onSearch: (genreIds: number[], language: string) => void}) {
  // State
  const [genres, isLoadingGenres, genresError] = useGenres();  
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [languages, isLoadingLanguages, languagesError] = useLanguages();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const isFilterStateDifferentFromUrl = (selectedGenres.join(",") !== (getUrlParam("genres") || "") || selectedLanguage !== (getUrlParam("language") || ""));

  // State handlers
  function handleToggleGenre(index: number) {
    if (!genres) return;
    const genre = genres[index];
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre.id)) {
        return prevGenres.filter((id) => id !== genre.id);
      } else {
        return [...prevGenres, genre.id];
      }
    });
  }

  function handleLanguageChange(language: string) {
    setSelectedLanguage(language);
  }

  // set genres and language when the url changes (e.g. back button)
  function onRouteChange() {
    setSelectedGenres(getUrlParamArray("genres").map(Number));
    setSelectedLanguage(getUrlParam("language") || "");
  }

  useEffect(() => {
    onRouteChange();
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);


  // Render
  if(genresError || languagesError) return <p>Error loading filter</p>; // This is not ideal, but it's fine for now

  // Display placeholder while loading
  if(isLoadingGenres || !genres || isLoadingLanguages || !languages){
      return (
      <>
        <SearchSection sectionTitle="Filters" searchSectionParts={[]} startExpanded={true} />
        <Button text="Search" onClick={() => {onSearch(selectedGenres, selectedLanguage)}} rounded disabled  />
      </>
    )
  }

  const genreItems = genres.map((genre: Genre) => {
    return {text: genre.name, isToggled: selectedGenres.includes(genre.id)};
  });

  const languageOptions: { [key: string]: string }  = {};
  languages.forEach((language) => {
    languageOptions[language.iso_639_1] = language.english_name;
  });



  const filters = [
    {title: "Genres", content: <MultipleSelectToggle items={genreItems} onToggle={handleToggleGenre}  />}, 
    {title: "Language", content: <Dropdown options={languageOptions} selectedOption={selectedLanguage} onOptionChange={handleLanguageChange} />}
  ];

  return (
    <>
      <SearchSection sectionTitle="Filters" searchSectionParts={filters} startExpanded={true} />
      <Button text="Search" onClick={() => {onSearch(selectedGenres, selectedLanguage)}} rounded disabled={!isFilterStateDifferentFromUrl}  />
    </>
  );
}