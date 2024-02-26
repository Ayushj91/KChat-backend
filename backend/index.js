import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const port = process.env.PORT || 5000;

const app= express();
app.use(express.json());
app.use(cookieParser());

import authRoutes from './routes/auth.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './db/ConnectToMongo.js';
app.get('/', (req, res)=> {
    res.send("server is ready");
});

app.use('/api/auth', authRoutes);

app.use('/api/messages', messagesRoutes);

app.use('/api/users', userRoutes);

app.listen(port, ()=> {
    connectToMongoDB();
    console.log(`Server is running at http://localhost:${port}`);
})
