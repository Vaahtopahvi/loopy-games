// import  { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Container from "./components/Container";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        <Container className="py-6">
          <Home />
        </Container>
      </main>
    </div>
  );
}
