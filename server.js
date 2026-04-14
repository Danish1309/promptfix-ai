import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import handler from './api/improve.js';

dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Explicitly serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Mock Vercel handler for local testing
app.post('/api/improve', async (req, res) => {
    try {
        await handler(req, res);
    } catch (err) {
        console.error("Local Server Error:", err);
        res.status(500).json({ error: "Local server failed to handle request" });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 PromptFix AI running at http://localhost:${PORT}`);
    console.log(`📝 Backend mapped: /api/improve -> api/improve.js\n`);
});
