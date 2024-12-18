import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './api/routes/auth.js';  // Add .js extension
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
