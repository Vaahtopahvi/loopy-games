import Button from "@mui/material/Button";
import Container from "./Container";

export function Header() {
  return (
    <header className="w-full border-b border-red-500">
      <Container className="py-6 flex justify-between items-center">
        <span className="text-xl font-semibold">
          Tracking and review of my games
        </span>
        <Button variant="contained" color="primary">
          Add New Game
        </Button>
      </Container>
    </header>
  );
}

export default Header;
