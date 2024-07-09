import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectCloudinary from './src/config/cloudinary.js';
import connectDB from './src/config/mongodb.js';
import songRouter from './src/routes/songRoute.js';
import albumRouter from './src/routes/albumRoute.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// initilizing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get('/', (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));