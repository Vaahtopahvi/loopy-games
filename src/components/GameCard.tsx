import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";

import { type Game } from "../types/Game";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="bg-gray-900 text-white w-full">
      <CardHeader>
        {game.coverImage && (
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-48 object-cover rounded-t-md"
          />
        )}
        <h2 className="text-lg font-semibold">{game.title}</h2>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary">{game.genre}</Badge>
          <Badge variant="secondary">{game.platform}</Badge>
          <Badge variant="default">
            {game.gameType === "story" ? "Story" : "Endless"}
          </Badge>
          {game.completionist && <Badge variant="destructive">100%</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center gap-4 text-sm mb-2">
          <span>
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            Completed: {game.completionDate}
          </span>
          <span>
            <span role="img" aria-label="clock">
              ⏰
            </span>{" "}
            {game.playtime}h
          </span>
        </div>
        <div>
          <strong>Rating:</strong> {"⭐".repeat(game.rating)}
        </div>
        <div>
          <strong>Review</strong>
          <p className="text-sm">{game.review}</p>
        </div>
        {game.interestingFact && (
          <div>
            <strong>Interesting Fact</strong>
            <p className="text-sm italic">{game.interestingFact}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="text-sm">Recommend?</span>
        <div className="flex items-center gap-2">
          <Switch checked={game.recommended} />
          {game.recommended && <Badge variant="secondary">Recommended</Badge>}
        </div>
        <Switch checked={game.recommended} />
      </CardFooter>
    </Card>
  );
}
