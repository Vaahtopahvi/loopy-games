// import  { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { games as allGames } from "./data/games";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "./components/Container";
import Form from "./components/Form";
import AdminLogin from "./components/AdminLogin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { type Game } from "./types/Game.js";

export default function App() {
  const [games, setGames] = useState<Game[]>(allGames); // start with local data
  const [filteredGames, setFilteredGames] = useState<Game[]>(allGames);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Check if admin token exists in localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdminToken(token);
      setIsAdminAuthenticated(true);
    }
  }, []);

  // load games from API on mount
  useEffect(() => {
    const loadGames = async () => {
      try {
        const { GameService } = await import("./services/gameService.js");
        const apiGames = await GameService.getAllGames();

        if (apiGames.length > 0) {
          // use API data if available
          setGames(apiGames);
          setFilteredGames(apiGames);
        } else {
          // fall back to local data if no API data
          setGames(allGames);
          setFilteredGames(allGames);
        }
      } catch (error) {
        console.error(
          "Failed to load games from API, using local data:",
          error
        );
        // keep local data as fallback
        setGames(allGames);
        setFilteredGames(allGames);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    setIsAdminAuthenticated(false);
    setIsFormOpen(false);
  };

  const handleGameAdded = async () => {
    try {
      const { GameService } = await import("./services/gameService.js");
      const updatedGames = await GameService.getAllGames();
      setGames(updatedGames);
      setFilteredGames(updatedGames);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to refresh games after adding:", error);
      // refresh the games from the local data as fallback
      setGames(allGames);
      setFilteredGames(allGames);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header
        games={games}
        onFilterChange={setFilteredGames}
        onAddGame={() => setIsFormOpen(true)}
        isAdminLoggedIn={isAdminAuthenticated}
        onLogout={handleLogout}
      />
      <main>
        <Container className="py-6">
          {/* Show login form if not authenticated, otherwise show add game form */}
          {isAdminAuthenticated ? (
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Game</DialogTitle>
                </DialogHeader>
                <Form
                  onGameAdded={handleGameAdded}
                  onClose={() => setIsFormOpen(false)}
                  adminToken={adminToken}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogContent>
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-white">Loading games...</div>
            </div>
          ) : (
            <Home games={filteredGames} />
          )}
        </Container>
      </main>
    </div>
  );
}
