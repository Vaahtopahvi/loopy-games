import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/button";

import { type Game } from "../types/Game";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="bg-gray-900 text-white w-full">
      <CardHeader>
        <h2 className="text-lg font-semibold">{game.title}</h2>
        <div className="flex flex-wrap gap-1 mt-2">
          {game.genres.map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
