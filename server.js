const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory storage
const store = {};

app.get("/", (req, res) => {
    res.send("API is running");
});

/**
 * POST /store
 * Body:
 * {
 *   "id": "123",
 *   "url": "https://google.com"
 * }
 */
app.post("/store", (req, res) => {
    const { id, url } = req.body;

    if (!id || !url) {
        return res.status(400).json({
            success: false,
            message: "id and url are required",
        });
    }

    store[id] = {
        id,
        url,
    };

    res.json({
        success: true,
        data: store[id],
    });
});

/**
 * GET /store?id=123
 */
app.get("/store", (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "id is required",
        });
    }

    if (!store[id]) {
        return res.status(404).json({
            success: false,
            message: "Not found",
        });
    }

    res.json(store[id]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
