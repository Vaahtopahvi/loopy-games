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
          {game.platforms.map((platform) => (
            <Badge key={platform} variant="outline">
              {platform}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm">
          <strong>Completed:</strong> {game.completionDate}
        </p>
        <p className="text-sm">
          <strong>Hours:</strong> {game.hoursPlayed}h
        </p>
        <p className="text-sm">
          <strong>Rating:</strong> {"⭐".repeat(game.rating)}
        </p>
        <p className="text-sm">{game.review}</p>
        {game.interestingFact && (
          <p className="text-sm italic">{game.interestingFact}</p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="text-sm">Recommend?</span>
        <Switch checked={game.recommended} />
      </CardFooter>
    </Card>
  );
}
