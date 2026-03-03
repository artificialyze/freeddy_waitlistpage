import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize Postgres/CockroachDB connection pool
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for CockroachDB serverless clusters
    }
});

// Endpoint to handle waitlist submission
app.post('/api/join', async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required.' });
    }

    try {
        // Insert email into the database. Using ON CONFLICT to avoid duplicate error to the user if they've already joined.
        const query = `
      INSERT INTO waitlist (email) 
      VALUES ($1) 
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;
        const result = await pool.query(query, [email]);

        console.log(`Email saved successfully: ${email}`);
        res.status(201).json({ message: 'Welcome to the waitlist!', data: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to join. Please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Connect your database by setting DATABASE_URL in .env');
});
