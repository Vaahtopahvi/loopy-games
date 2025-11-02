import { Button } from "../components/ui/button";
import Container from "./Container";
import { Plus } from "lucide-react";
import SearchFilter from "./SearchFilter";
import { type Game } from "../types/Game";

type HeaderProps = {
  games: Game[];
  onFilterChange: (filteredGames: Game[]) => void;
  onAddGame: () => void;
};

export function Header({ games, onFilterChange, onAddGame }: HeaderProps) {
  return (
    <header className="w-full border-b border-red-500">
      <Container className="py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">
            Tracking and review of my favorite ones
          </span>
          <Button onClick={onAddGame} className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 cursor-pointer">
            <Plus size={16} />
            Add New Game
          </Button>
        </div>
        <div className="w-full">
          <SearchFilter games={games} onChange={onFilterChange} />
        </div>
      </Container>
    </header>
  );
}

export default Header;
