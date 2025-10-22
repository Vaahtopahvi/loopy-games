// src/pages/Home.tsx
import { type Game } from "../types/Game";
import { GameCard } from "../components/GameCard";

type HomeProps = {
  games: Game[];
};

export default function Home({ games }: HomeProps) {
  return (
    <div className="w-full">
      <div className="pt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
