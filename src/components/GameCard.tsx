import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Clock, Gamepad2, Pencil, CheckCircle2, CircleHelp, Star, Trophy } from "lucide-react";
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
    <Card className="bg-(--bg-card) text-white w-full flex flex-col overflow-hidden p-0 gap-0">
      {/* Header: Cover Image + Badges + Edit Button */}
      <CardHeader className="pb-3 pt-4">
        <div className="flex gap-3 items-start">
          {/* Cover Image */}
          {game.coverImage && (
            <div className="w-16 h-20 flex-shrink-0">
              <img
                src={game.coverImage}
                alt={game.title}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          )}
          
          {/* Badges and Edit Button */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-start justify-between">
              <h2 className="text-base font-semibold">{game.title}</h2>
              <button className="p-2 rounded-md hover:bg-white/10">
                <Pencil className="h-4 w-4 text-white/70"/>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs">
                <span className="flex items-center gap-1">
                  <Gamepad2 className="h-3 w-3" />
                  {game.genre}
                </span>
              </Badge>
              <Badge
                variant="secondary"
                className="bg-(--bg-platform) text-white ring-2 ring-gray-500/20 text-xs"
              >
                {game.platform}
              </Badge>
              <Badge
                variant="default"
                className={
                  game.gameType === "story"
                    ? "bg-(--badge-story) text-white border-transparent text-xs"
                    : "bg-(badge-endless) text-white border-transparent text-xs"
                }
              >
                {game.gameType === "story" ? "Story" : "Endless"}
              </Badge>
              {game.completionist && (
                <Badge variant="secondary" className="bg-(--badge-completionist) text-xs">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    100%
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Content: Rating, Review, Fact */}
      <CardContent className="space-y-5 pt-0 pb-3 flex-1 px-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white/80">
              {game.isOngoing ? (
                <CircleHelp className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {game.isOngoing ? "On-going" : `Completed: ${game.completionDate}`}
            </span>
            <span className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4" /> {game.playtimeHours}h
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm font-medium">Rating:</span>
            <div className="flex items-center gap-0.5" aria-label={`Rating ${game.rating} of 5`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < game.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-none text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <strong className="block mb-1 text-sm">Review</strong>
            <p className="text-sm text-white/90 leading-relaxed">{game.review}</p>
          </div>

          {game.interestingFact && (
            <div>
              <strong className="block mb-1 text-sm">Interesting Fact</strong>
              <p className="text-sm italic text-blue-300/90 underline underline-offset-2 leading-relaxed">
                {game.interestingFact}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0 pb-4 px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Recommend?</span>
            <Switch checked={game.recommended} />
          </div>
          {game.recommended && (
            <Badge variant="secondary" className="bg-(--badge-recommended)">
              Recommended
            </Badge>
          )}
        </CardFooter>
    </Card>
  );
}
