// import  { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { games as allGames } from "./data/games";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "./components/Container";


export default function App() {
  const [filteredGames, setFilteredGames] = useState(allGames)
  
  return (
    <div className="min-h-screen text-white">
      <Header games={allGames} onFilterChange={setFilteredGames} />
      <main>
        <Container className="py-6">
          <Home games={filteredGames} />
        </Container>
      </main>
    </div>
  );
}
