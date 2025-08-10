import { type Game } from "../types/Game";

export const games: Game[] = [
  {
    id: "1",
    title: "The binding of Isaac",
    genres: ["Roguelike", "Action", "Indie"],
    platforms: "PC",
    completionDate: "On-going",
    hoursPlayed: 598,
    rating: 5,
    review:
      "A dark, twisted, and addictive roguelike that keeps you coming back for more.",
    interestingFact: "There's a lot of poop in this game.",
    imageUrl: "",
    recommended: true,
  },
  {
    id: "2",
    title: "Hades",
    genres: ["Roguelike", "Endless"],
    platforms: "Switch",
    completionDate: "2024-02-28",
    hoursPlayed: 85,
    rating: 5,
    review: "Perfect blend of storytelling and gameplay. Each run feels fresh.",
    interestingFact:
      "The voice actor for Zagreus recorded over 21,000 lines of dialogue.",
    imageUrl: "",
    recommended: true,
  },
  {
    id: "3",
    title: "The Witcher 3: Wild Hunt",
    genres: ["RPG", "Story"],
    platforms: "PC",
    completionDate: "2024-01-15",
    hoursPlayed: 120,
    rating: 5,
    review:
      "An absolute masterpiece. Storytelling and world-building are unmatched.",
    interestingFact:
      "Contains over 36 different ending variations based on your choices.",
    imageUrl: "",
    recommended: true,
  },
];
