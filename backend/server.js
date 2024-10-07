import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectToMongoDb from './db/connectToMongoDB.js';

import authRoutes from './routes/auth.route.js'
import profileRoutes from './routes/profile.route.js'




const app = express();

app.use(express.json());  // to parse the incoming requests with JSON payloads (from req.body)
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});