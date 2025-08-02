const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const API = "https://api.jikan.moe/v4";

// Route for searching anime
app.get("/search", async (req, res) => {
    const anime = req.query.anime;
    try {
        const response = await axios.get(`${API}/anime`, { params: { q: anime } });
        res.json({ results: response.data.data });
    } catch (error) {
        res.status(500).json({ error: "Search failed." });
    }
});

// Route for recommendations
app.get("/recommendations", async (req, res) => {
    const animeId = req.query.animeId;
    try {
        const response = await axios.get(`${API}/anime/${animeId}/recommendations`);
        res.json({ recommendations: response.data.data });
    } catch (error) {
        res.status(500).json({ error: "Recommendation fetch failed." });
    }
});

