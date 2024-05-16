import MultipleSelectToggle from "@/components/common/MultipleSelectToggle";
import SearchSection from "@/components/SearchSection";
import MainWithSidebarLayout from "@/components/layout/MainWithSidebarLayout";
import { useEffect,useState } from "react";
import Button from "@/components/common/Button";
import { Genre, useMovies, useGenres, useLanguages } from "@/api/thbd";
import MovieList from "@/components/MovieList";
import Pagination from "@/components/common/Pagination";
import Dropdown from "@/components/common/Dropdown";

export default function Movies() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [page, setPage] = useState(1);
  const {movies, isLoading, error} = useMovies({page: page, genreIds: selectedGenres, language: selectedLanguage});

  async function handleSearch(genreIds: number[], language: string) {
    setSelectedGenres(genreIds); 
    setSelectedLanguage(language);
    setPage(1);

    // write query params to URL
    const searchParams = new URLSearchParams();
    if (genreIds.length > 0) {
      searchParams.set("genres", genreIds.join(","));
    } else {
      searchParams.delete("genres");
    }
    if (language) {
      searchParams.set("language", language);
    } else {
      searchParams.delete("language");
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  }

  function handleSetPage(newPage: number) {
    setPage(newPage);
  }


  if(error) return <p>Error loading movies</p>; // This is not ideal, but it's fine for now

  // Display placeholder while loading
  if(isLoading || !movies){
    return (
      <MainWithSidebarLayout title="Movies" sidebar={<MovieFilter onSearch={handleSearch} />} >
        <MovieList />
      </MainWithSidebarLayout>
    )
  }

  return (
    <MainWithSidebarLayout title="Movies" sidebar={<MovieFilter onSearch={handleSearch} />} >
      <MovieList movies={movies} />
      <Pagination page={page} totalPages={10} onPageChange={handleSetPage} />
    </MainWithSidebarLayout>
  );
}


function MovieFilter({onSearch}: {onSearch: (genreIds: number[], language: string) => void}) {
  const [genres, isLoadingGenres, genresError] = useGenres();  

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [languages, isLoadingLanguages, languagesError] = useLanguages();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // set genres and language when the url changes (e.g. back button)
  function handleRouteChange() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const gIds = urlSearchParams.get("genres")?.split(",").map(Number) || [];
    const language = urlSearchParams.get("language") || "";
    console.log("setting genres and language", gIds, language);

    setSelectedGenres(gIds);
    setSelectedLanguage(language);
  }

  useEffect(() => {
    handleRouteChange();
    window.addEventListener('popstate', ()=>{handleRouteChange(); onSearch(selectedGenres, selectedLanguage)});
    return () => {
      window.removeEventListener('popstate', ()=>{handleRouteChange(); onSearch(selectedGenres, selectedLanguage)});
    };
  }, []);

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
      <Button text="Search" onClick={() => {onSearch(selectedGenres, selectedLanguage)}} rounded  />
    </>
  );
}