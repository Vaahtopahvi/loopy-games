// import  { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { games as allGames } from "./data/games";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "./components/Container";
import Form from "./components/Form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";


export default function App() {
  const [filteredGames, setFilteredGames] = useState(allGames)
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  return (
    <div className="min-h-screen text-white">
      <Header games={allGames} onFilterChange={setFilteredGames} onAddGame={() => setIsFormOpen(true)} />
      <main>
        <Container className="py-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-white">Add New Game</DialogTitle>
              </DialogHeader>
              <Form />
            </DialogContent>
          </Dialog>
          <Home games={filteredGames} />
        </Container>
      </main>
    </div>
  );
}
