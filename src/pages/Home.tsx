import { games } from "../data/games";
import { GameCard } from "../components/GameCard";

export default function Home() {
  return (
    <div className="w-full px-4 2xl:max-w-5xl 2xl:mx-auto">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
