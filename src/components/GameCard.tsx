import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";

import { type Game } from "../types/Game";

const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Fighting",
  "Puzzle",
  "Shooter",
  "Horror",
  "Roguelike",
  "MMORPG",
  "Battle Royale",
  "Survival",
  "Stealth",
  "Indie",
];

const PLATFORMS = [
  "PC",
  "PlayStation 5",
  "Xbox Series X/S",
  "Mobile",
  "Nintendo Switch",
  "Retro Console",
];

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="bg-(--bg-card) text-white w-full">
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
          <Badge variant="secondary" className="bg-(--bg-platform) text-white ring-2 ring-gray-500/20">
            {game.platform}
          </Badge>
          <Badge
            variant="default"
            className={
              game.gameType === "story"
                ? "bg-(--badge-story) text-white border-transparent"
                : "bg-(badge-endless) text-white border-transparent"
            }
          >
            {game.gameType === "story" ? "Story" : "Endless"}
          </Badge>
          {game.completionist && (
            <Badge variant="secondary" className="bg-(--badge-completionist)">
              100%
            </Badge>
          )}
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
        <div className="flex items-center gap-2">
          <span className="text-sm">Recommend?</span>
          <Switch checked={game.recommended} />
        </div>
          {game.recommended && <Badge variant="secondary" className="bg-(--badge-recommended)">Recommended</Badge>}
      </CardFooter>
    </Card>
  );
}
