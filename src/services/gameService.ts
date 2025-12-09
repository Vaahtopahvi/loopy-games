import { type Game } from "../types/Game.js";

// handle all the game related API calls
export class GameService {
  private static baseUrl = "http://localhost:3000/api";

  // get all games from the database
  static async getAllGames(): Promise<Game[]> {
    try {
      const response = await fetch(`${this.baseUrl}/games`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data = await response.json();
      return data.games || [];
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  }

  // add a new game to the database
  static async addGame(gameData: Omit<Game, "id">): Promise<Game> {
    try {
      const response = await fetch(`${this.baseUrl}/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add game");
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding game:", error);
      throw error;
    }
  }

  // search for games by name
  static async searchGames(query: string): Promise<Game[]> {
    if (query.length < 2) return [];

    try {
      const response = await fetch(
        `${this.baseUrl}/games/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search games");
      }
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error searching games:", error);
      return [];
    }
  }
}
