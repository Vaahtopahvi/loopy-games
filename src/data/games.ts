import { type Game } from "../types/Game";

export const games: Game[] = [
  {
    id: "isaac",
    title: "The binding of Isaac",
    genre: "Roguelike",
    platform: "PC",
    completionDate: "On-going",
    playtimeHours: 598,
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
    genre: "Fighting",
    platform: "Switch",
    completionDate: "2024/02/28",
    playtimeHours: 85,
    rating: 4,
    review: "Perfect blend of storytelling and gameplay. Each run feels fresh and the narrative progresses even through failure. The art style and music are incredible.",
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
    platform: "Playstation 5",
    completionDate: "2024/01/15",
    playtimeHours: 120,
    rating: 5,
    review:
      "An absolute masterpiece. The storytelling, world-building, and character development are unparalleled. Every side quest feels meaningful and the main story is gripping from start to finish.",
    interestingFact:
      "Contains over 36 different ending variations based on your choices.",
    coverImage: "src/public/covers/Witcher_3_cover_art.jpeg",
    gameType: "story",
    recommended: true,
    isOngoing: false,
    completionist: false,
  },
  {
    id: "OSRS",
    title: "Old School Runescape",
    genre: "RPG",
    platform: "PC",
    completionDate: "On-Going",
    playtimeHours: 999,
    rating: 5,
    review:
      "Get ready to become addicted to this game. There's just too much to do, too many quests to complete, and too many skills to grind. So many wasted hours just to get to max level and to obtain your favorite pet from the boss.",
    interestingFact:
      "Other people can't trim your armor",
    coverImage: "src/public/covers/Witcher_3_cover_art.jpeg",
    gameType: "story",
    recommended: true,
    isOngoing: true,
    completionist: false,
  },
];
