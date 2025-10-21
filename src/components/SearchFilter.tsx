import { useEffect, useMemo, useState } from "react";
import { type Game } from "../types/Game";

//props for the search filter component
type Props = {
  games: Game[]; //list of all the games
  onChange: (filtered: Game[]) => void; //callback function to update the filtered games
};

function SearchFilter({ games, onChange }: Props) {
  const [searchInput, setSearchInput] = useState("");

  //filter the games based on the search input
  const filtered = useMemo(() => {
    const cleanedInput = searchInput.trim().toLowerCase();
    if (!cleanedInput) return games; //if no input, return all games

    //return only the games that match the search query in these fields
    return games.filter((game) => {
      const title = game.title.toLowerCase();
      const genre = game.genre.toLowerCase();
      const platform = game.platform.toLowerCase();
      const review = (game.review || "").toLowerCase();

      return (
        title.includes(cleanedInput) ||
        genre.includes(cleanedInput) ||
        platform.includes(cleanedInput) ||
        review.includes(cleanedInput)
      );
    });
  }, [games, searchInput]);

  //update the parent component whenever the filtered games change
  useEffect(() => {
    onChange(filtered);
  }, [filtered, onChange]);

  //the search input field
  return (
    <div className="w-full mb-4">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by title, genre, platform..."
        className="w-full rounded-md border bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
      />
    </div>
  );
}

export default SearchFilter;
