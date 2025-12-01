import { useState } from "react";
import { Trophy, Star } from "lucide-react";
import GameAutocomplete from "./GameAutocomplete";

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

interface FormProps {
  onGameAdded?: () => void;
}

function Form({ onGameAdded }: FormProps) {
  const [gameTitle, setGameTitle] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [genre, setGenre] = useState("Select genre");
  const [platform, setPlatform] = useState("Select platform");
  const [playtimeHours, setPlaytimeHours] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isOngoing, setIsOngoing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [interestingFact, setInterestingFact] = useState("");

  const handleGameSelect = (game: {
    id: number;
    name: string;
    releaseDate: string | null;
    coverUrl: string | null;
  }) => {
    if (game.coverUrl) {
      setCoverImageUrl(game.coverUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!gameTitle.trim()) {
      alert("Please enter a game title");
      return;
    }

    if (genre === "Select genre") {
      alert("Please select a genre");
      return;
    }

    if (platform === "Select platform") {
      alert("Please select a platform");
      return;
    }

    // create game object
    const newGame = {
      id: gameTitle
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      title: gameTitle,
      genre,
      platform,
      completionDate: isOngoing ? "On-going" : completionDate || "",
      playtimeHours: parseInt(playtimeHours) || 0,
      rating,
      review,
      interestingFact,
      coverImage: coverImageUrl,
      gameType: "story" as const, // default to story, could be enhanced later
      recommended: false, // default to false, could be enhanced later
      isOngoing,
      completionist: isCompleted,
    };

    try {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });

      if (response.ok) {
        alert("Game added successfully! Change this to a toast notification");
        // reset form
        setGameTitle("");
        setCoverImageUrl("");
        setGenre("Select genre");
        setPlatform("Select platform");
        setPlaytimeHours("");
        setCompletionDate("");
        setIsOngoing(false);
        setIsCompleted(false);
        setRating(0);
        setReview("");
        setInterestingFact("");
        // notify parent component that the game has been added
        onGameAdded?.();
      } else {
        alert("Failed to add game. Please try again.");
      }
    } catch (error) {
      console.error("Error adding game:", error);
      alert("Error adding game. Please check your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Game Title
          </label>
          <GameAutocomplete
            value={gameTitle}
            onChange={setGameTitle}
            onGameSelect={handleGameSelect}
            placeholder="Search for a game..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Cover Image URL
          </label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="Unless IGDB doesn't find, provide own"
            className="w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-2">
              Genre
            </label>

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Select genre" disabled>
                Select genre
              </option>
              {GENRES.map((genreOption) => (
                <option key={genreOption} value={genreOption}>
                  {genreOption}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className=" w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Select platform" disabled>
                Select platform
              </option>
              {PLATFORMS.map((platformOption) => (
                <option key={platformOption} value={platformOption}>
                  {platformOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-2">
              Playtime in hours
            </label>
            <input
              type="text"
              value={playtimeHours}
              onChange={(e) => setPlaytimeHours(e.target.value)}
              placeholder="e.g. 69"
              className="w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        {/* completion status section */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-2">
              Completion Status
            </label>
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => setIsOngoing(!isOngoing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isOngoing ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isOngoing ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-white text-sm">On-going</span>
            </div>
            {!isOngoing && (
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-2">
              {isCompleted ? "Nice." : "Were you a man enough?"}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCompleted(!isCompleted)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isCompleted ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isCompleted ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-white text-sm">100% Completed</span>
              {isCompleted && <Trophy className="w-4 h-4 text-blue-400" />}
            </div>
          </div>
        </div>

        {/* rating section. why does it has to be so difficult to implement? AAAAAARGH. thx AI */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Rating
          </label>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFull = star <= Math.floor(rating);
              const isHalf = !isFull && star - 0.5 === rating;

              return (
                <div key={star} className="relative w-6 h-6">
                  {/* full star button (right half) */}
                  <button
                    type="button"
                    onClick={() => setRating(star)}
                    className="absolute right-0 w-1/2 h-full z-10"
                    aria-label={`Rate ${star} stars`}
                  />
                  {/* half star button (left half) */}
                  <button
                    type="button"
                    onClick={() => setRating(star - 0.5)}
                    className="absolute left-0 w-1/2 h-full z-10"
                    aria-label={`Rate ${star - 0.5} stars`}
                  />

                  {/* star icon display */}
                  {isFull ? (
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ) : isHalf ? (
                    <>
                      {/* empty star background */}
                      <Star className="w-6 h-6 fill-none text-gray-600 absolute" />
                      {/* half star overlay - clip the left 50% */}
                      <div className="overflow-hidden w-1/2 absolute">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      </div>
                    </>
                  ) : (
                    <Star className="w-6 h-6 fill-none text-gray-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* review section */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What made the game so special?"
            rows={4}
            className="w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        {/* interesting fact section */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Interesting Fact
          </label>
          <input
            type="text"
            value={interestingFact}
            onChange={(e) => setInterestingFact(e.target.value)}
            placeholder="What's one interesting fact about this game?"
            className="w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Add Game
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
