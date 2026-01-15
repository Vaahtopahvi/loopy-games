import { Button } from "../components/ui/button";
import Container from "./Container";
import { Plus, LogOut } from "lucide-react";
import SearchFilter from "./SearchFilter";
import { type Game } from "../types/Game";

type HeaderProps = {
  games: Game[];
  onFilterChange: (filteredGames: Game[]) => void;
  onAddGame: () => void;
  isAdminLoggedIn?: boolean;
  onLogout?: () => void;
};

export function Header({ 
  games, 
  onFilterChange, 
  onAddGame,
  isAdminLoggedIn = false,
  onLogout
}: HeaderProps) {
  return (
    <header className="w-full border-b">
      <Container className="py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">
            Tracking and personal review of my favorite ones
          </span>
          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <span className="text-sm text-green-400 mr-2">✓ Admin</span>
            )}
            <Button onClick={onAddGame} className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 cursor-pointer">
              <Plus size={16} />
              Add New Game
            </Button>
            {isAdminLoggedIn && onLogout && (
              <Button 
                onClick={onLogout} 
                className="bg-red-600 hover:bg-red-700 inline-flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </Button>
            )}
          </div>
        </div>
        <div className="w-full">
          <SearchFilter games={games} onChange={onFilterChange} />
        </div>
      </Container>
    </header>
  );
}

export default Header;
