import { type Game } from "../types/Game";

export const games: Game[] = [
  {
    id: "isaac",
    title: "The binding of Isaac",
    genre: "Roguelike",
    platform: "PC",
    completionDate: "On-going",
    playtime: "598",
    rating: 5,
    review:
      "A dark, twisted, and addictive roguelike that keeps you coming back for more.",
    interestingFact: "There's a lot of poop in this game.",
    coverImage: "",
    gameType: "endless",
    recommended: true,
    isOngoing: true,
    completionist: false,
  },
  {
    id: "hades",
    title: "Hades",
    genre: "Roguelike",
    platform: "Switch",
    completionDate: "2024-02-28",
    playtime: "85",
    rating: 5,
    review: "Perfect blend of storytelling and gameplay. Each run feels fresh.",
    interestingFact:
      "The voice actor for Zagreus recorded over 21,000 lines of dialogue.",
    coverImage: "",
    gameType: "endless",
    recommended: true,
    isOngoing: false,
    completionist: true,
  },
  {
    id: "witcher3",
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    platform: "PC",
    completionDate: "2024-01-15",
    playtime: "120",
    rating: 5,
    review:
      "An absolute masterpiece. Storytelling and world-building are unmatched.",
    interestingFact:
      "Contains over 36 different ending variations based on your choices.",
    coverImage: "",
    gameType: "story",
    recommended: true,
    isOngoing: false,
    completionist: false,
  },
];
