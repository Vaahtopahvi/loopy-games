import express, { type Request, type Response } from "express";
import { Game } from "../models/Game.js";
import { authenticate, adminOnly } from "../middleware/auth.js";

interface IGDBGameResponse {
  id: number;
  name: string;
  first_release_date?: number;
  cover?: {
    image_id: string;
  };
}

const router = express.Router();

// search games for autocomplete
router.get("/search", async (req: Request, res: Response) => {
  try {
    // import required modules here or at the top
    const axios = (await import("axios")).default;

    // get access token function - might want to move this to a shared service later
    const getAccessToken = async () => {
      const dotenv = await import("dotenv");
      dotenv.default.config();

      const CLIENT_ID = process.env.CLIENT_ID;
      const CLIENT_SECRET = process.env.CLIENT_SECRET;
      const TOKEN_URL = "https://id.twitch.tv/oauth2/token";

      if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error(
          "Missing CLIENT_ID or CLIENT_SECRET in environment variables"
        );
      }

      try {
        const response = await axios.post(TOKEN_URL, null, {
          params: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        });
        return response.data.access_token;
      } catch (error) {
        console.error("❌ Error fetching access token:", error);
        throw error;
      }
    };

    let accessToken: string | null = null;

    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const query = req.query.q as string;
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const IGDB_API_URL = "https://api.igdb.com/v4/games";
    const CLIENT_ID = process.env.CLIENT_ID;

    const response = await axios.post<IGDBGameResponse[]>(
      IGDB_API_URL,
      `search "${query}"; fields name, first_release_date, cover.image_id; limit 10;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    const results = response.data.map((game: IGDBGameResponse) => ({
      id: game.id,
      name: game.name,
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toLocaleDateString()
        : null,
      coverUrl: game.cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_thumb/${game.cover.image_id}.jpg`
        : null,
    }));

    res.json(results);
  } catch (error) {
    console.error("Error searching games:", error);
    res.status(500).json({ error: "Failed to search games" });
  }
});

// get all games from collection
router.get("/", async (_req: Request, res: Response) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 }); // most recent first

    res.json({
      message: "Games retrieved successfully",
      games: games,
      count: games.length,
    });
  } catch (error) {
    console.error("Error retrieving games:", error);
    res.status(500).json({ error: "Failed to retrieve games" });
  }
});

// add new game to collection
router.post("/", authenticate, adminOnly, async (req: Request, res: Response) => {
  try {
    const gameData = req.body;

    // basic validation
    if (!gameData.title || !gameData.genre || !gameData.platform) {
      return res.status(400).json({
        error: "Missing required fields: title, genre, platform",
      });
    }

    // create new game document
    const newGame = new Game({
      title: gameData.title,
      genre: gameData.genre,
      platform: gameData.platform,
      completionDate: gameData.completionDate,
      playtimeHours: gameData.playtimeHours,
      rating: gameData.rating,
      review: gameData.review,
      interestingFact: gameData.interestingFact,
      coverImage: gameData.coverImage,
      gameType: gameData.gameType,
      recommended: gameData.recommended,
      isOngoing: gameData.isOngoing,
      completionist: gameData.completionist,
    });

    // save the new game to MongoDB
    const savedGame = await newGame.save();

    console.log("✅ Game saved to database:", savedGame.title);

    res.status(201).json({
      message: "Game added successfully",
      game: savedGame,
    });
  } catch (error) {
    console.error("❌ Error adding game:", error);

    // handle duplicate key error (same title + platform)
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(409).json({
        error:
          "A game with this title and platform already exists in your collection",
      });
    }

    // handle validation errors
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ValidationError"
    ) {
      const validationError = error as { message?: string };
      return res.status(400).json({
        error: "Validation error",
        details: validationError.message || "Invalid game data",
      });
    }

    res.status(500).json({ error: "Failed to add game" });
  }
});

export default router;
