import express, { type Request, type Response } from "express";

interface IGDBGameResponse {
  id: number;
  name: string;
  first_release_date?: number;
  cover?: {
    image_id: string;
  };
}

const router = express.Router();

// Search games for autocomplete
router.get("/search", async (req: Request, res: Response) => {
  try {
    // Import required modules here or at the top
    const axios = (await import("axios")).default;

    // Get access token function - you might want to move this to a shared service
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
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
        : null,
    }));

    res.json(results);
  } catch (error) {
    console.error("Error searching games:", error);
    res.status(500).json({ error: "Failed to search games" });
  }
});

// Add new game to collection
router.post("/", async (req: Request, res: Response) => {
  try {
    const gameData = req.body;

    // basic validation
    if (!gameData.title || !gameData.genre || !gameData.platform) {
      return res.status(400).json({
        error: "Missing required fields: title, genre, platform",
      });
    }

    // here you would typically save to a database
    // lets just return success for now
    console.log("New game added:", gameData);

    res.status(201).json({
      message: "Game added successfully",
      game: gameData,
    });
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(500).json({ error: "Failed to add game" });
  }
});

export default router;
