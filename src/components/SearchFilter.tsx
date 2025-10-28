import { useEffect, useMemo, useState } from "react";
import { type Game } from "../types/Game";
import { ArrowDownAZ } from "lucide-react";

export type SortOption = "a-z" | "z-a" | "most-recent" | "oldest";

//props for the search filter component
type Props = {
  games: Game[]; //list of all the games
  onChange: (filtered: Game[]) => void; //callback function to update the filtered games
};

function SearchFilter({ games, onChange }: Props) {
  const [searchInput, setSearchInput] = useState("");
  
  // track which sort option is selected (defaults to "a-z")
  const [sortOption, setSortOption] = useState<SortOption>("a-z");

  // useMemo only recalculates when games, searchInput, or sortOption changes
  // improves performance by avoiding unnecessary recalculations
  const filtered = useMemo(() => {
    const cleanedInput = searchInput.trim().toLowerCase();
    
    // start with all games
    let result = games;
    
    // only filter if user typed something
    if (cleanedInput) {
      // .filter() creates a new array with only games that match the search
      result = games.filter((game) => {
        const title = game.title.toLowerCase();
        const genre = game.genre.toLowerCase();
        const platform = game.platform.toLowerCase();
        const review = (game.review || "").toLowerCase();

        // return true if the search text is found in ANY of these fields
        return (
          title.includes(cleanedInput) ||
          genre.includes(cleanedInput) ||
          platform.includes(cleanedInput) ||
          review.includes(cleanedInput)
        );
      });
    }

    // [...result] creates a copy so we don't modify the original array
    // .sort() compares pairs of games (a and b) to determine their order
    const sorted = [...result].sort((a, b) => {
      switch (sortOption) {
        case "a-z":
          // localeCompare returns negative if a comes before b (alphabetically)
          return a.title.localeCompare(b.title);
        case "z-a":
          // and then the reverse
          return b.title.localeCompare(a.title);
        case "most-recent":
        case "oldest": {
          // if game is "On-going", treat it as today's date (most recent)
          const dateA = a.completionDate === "On-going" || a.completionDate === "On-Going" 
            ? new Date()  // if on-going, use current date
            : new Date(a.completionDate);  // otherwise, parse the completion date
          const dateB = b.completionDate === "On-going" || b.completionDate === "On-Going" 
            ? new Date() 
            : new Date(b.completionDate);
          
          // .getTime() converts dates to numbers
          // subtracting gives us the difference:
          // - positive number = b is more recent (b comes first)
          // - niggative number = a is more recent (a comes first)
          return sortOption === "most-recent" 
            ? dateB.getTime() - dateA.getTime()  // most recent first
            : dateA.getTime() - dateB.getTime();  // oldest first
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [games, searchInput, sortOption]);  // the dependencies: recalculate when these change

  // useEffect runs after the component renders
  // this sends the filtered games back to app.tsx
  useEffect(() => {
    onChange(filtered);
  }, [filtered, onChange]);  // run whenever filtered games change

  //the search input and sort dropown
  return (
    <div className="w-full mb-4 flex gap-5 items-center">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by title, genre, platform..."
        className="flex-1 rounded-md border bg-transparent px-3 py-2 text-white placeholder:text-gray-400"
      />
      
      {/* user selects how to sort */}
      <div className="flex items-center gap-2">
        <ArrowDownAZ className="w-4 h-4 text-white/70" />  {/* icon */}
        <select
          value={sortOption}  // currently selected sort option
          onChange={(e) => setSortOption(e.target.value as SortOption)}  // update when user selects
          className="rounded-md border bg-transparent px-3 py-2 text-white text-sm cursor-pointer hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="a-z" className="bg-gray-900">Title A-z</option>
          <option value="z-a" className="bg-gray-900">Title z-A</option>
          <option value="most-recent" className="bg-gray-900">Recently Completed</option>
          <option value="oldest" className="bg-gray-900">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
