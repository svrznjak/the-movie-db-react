import MultipleSelectToggle from "@/components/common/MultipleSelectToggle";
import SearchSection from "@/components/SearchSection";
import MainWithSidebarLayout from "@/components/layout/MainWithSidebarLayout";
import { useState } from "react";
import Button from "@/components/common/Button";

export default function Movies() {
  return (
    <MainWithSidebarLayout title="Movies" sidebar={<MovieFilter />} >
      <MovieList />
    </MainWithSidebarLayout>
  );
}

function MovieList() {
  return (
    <ul>
      <li>Movie 1</li>
      <li>Movie 2</li>
      <li>Movie 3</li>
    </ul>
  );
}

function MovieFilter() {
  const [genres, setGenres] = useState([{text: "Action", isToggled: false}, {text: "Comedy", isToggled: false}, {text: "Horror", isToggled: false}, {text: "Sci-Fi", isToggled: false}, {text: "Drama", isToggled: false}]);

  function handleToggleGenre(index: number) {
    const newGenres = genres.map((genre, i) => {
      if (i === index) {
        return {...genre, isToggled: !genre.isToggled};
      } else {
        return genre;
      }
    });
    setGenres(newGenres);
  }

  const filters = [{title: "Genres", content: <MultipleSelectToggle items={genres} onToggle={handleToggleGenre}  />}];

  return (
    <>
      <SearchSection sectionTitle="Filters" searchSectionParts={filters} startExpanded={true} />
      <Button text="Search" onClick={() => {}} rounded  />
    </>
  );
}