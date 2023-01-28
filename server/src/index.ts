// Import dependency
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// Server setup
const PORT = process.env.PORT || 4000;
const app: Application = express();
const DB_URI = process.env.DB_URI;

// DB connection
mongoose.connect(DB_URI, (): void => {
    console.log("DB is connected");
})

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Routes
import todoRoute from './routes/todoRoutes';

app.use(todoRoute);


app.listen(PORT, (): void => {
    console.log(`The server is up and running at port ${PORT}`);
})