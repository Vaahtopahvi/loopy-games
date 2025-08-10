export type Game = {
  id: string;
  title: string;
  genres: String[];
  platforms: string; // String[] if multiple platforms
  completionDate: string; // ISO date string
  hoursPlayed: number;
  rating: number; // 0-5 stars
  review: string;
  interestingFact?: string; //questionmark means this field is optional
  imageUrl?: string; // URL to the game's image
  recommended: boolean; // true if the game is recommended
};
