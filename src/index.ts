import dotenv from "dotenv";
dotenv.config();
import axios, { AxiosError } from "axios";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const IGDB_API_URL = "https://api.igdb.com/v4/games";
const TOKEN_URL = "https://id.twitch.tv/oauth2/token";

// Type definitions
interface IGDBAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface IGDBSearchResult {
  id: number;
  name: string;
  first_release_date?: number;
}

// Store access token
let accessToken: string | null = null;

// Get access token from Twitch
async function getAccessToken(): Promise<void> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Missing CLIENT_ID or CLIENT_SECRET in environment variables"
    );
  }

  try {
    const response = await axios.post<IGDBAccessToken>(TOKEN_URL, null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    });

    accessToken = response.data.access_token;
    console.log("✅ Access token obtained");
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("❌ Error fetching access token:", axiosError.message);
    process.exit(1);
  }
}

// Search game by name
app.get("/game/:gameName", async (req: Request, res: Response) => {
  if (!accessToken) {
    return res
      .status(503)
      .json({ error: "Server not ready. Please try again later." });
  }

  const gameName = req.params.gameName;
  if (!gameName) {
    return res.status(400).json({ error: "Game name is required" });
  }

  try {
    const response = await axios.post<IGDBSearchResult[]>(
      IGDB_API_URL,
      `search "${gameName}"; fields name, first_release_date; limit 1;`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    const gameData = response.data[0];
    if (!gameData) {
      return res.status(404).json({ error: "Game not found" });
    }

    const result = {
      name: gameData.name,
      ...(gameData.first_release_date && {
        releaseDate: new Date(
          gameData.first_release_date * 1000
        ).toLocaleDateString(),
        unixTimestamp: gameData.first_release_date,
      }),
    };

    res.json(result);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error fetching game data:", axiosError.message);
    res.status(500).json({
      error: "Failed to fetch game data",
      details: axiosError.message,
    });
  }
});

// Test endpoint - Get popular games
app.get('/api/games/popular', async (req: Request, res: Response) => {
  try {
    if (!accessToken) {
      await getAccessToken();
    }

    const response = await axios.post(
      IGDB_API_URL,
      'fields name, cover.image_id, first_release_date, rating; where rating > 80; sort rating desc; limit 10;',
      {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'text/plain'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
async function startServer() {
  try {
    await getAccessToken();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();