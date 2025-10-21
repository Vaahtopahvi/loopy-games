export type Game = {
  id: string;
  title: string;
  genre: string;
  platform: string; // String[] if multiple platforms
  completionDate: string; // ISO date string
  playtimeHours: number; // e.g., "On-going" or "2024-02-28"
  rating: number; // 0-5 stars
  review: string;
  interestingFact: string; //questionmark means this field is optional
  coverImage?: string; // URL to the game's image
  gameType: "story" | "endless";
  recommended: boolean; // true if the game is recommended
  isOngoing?: boolean; // true if the game is still being played
  completionist: boolean; // true if the game is completed
};
