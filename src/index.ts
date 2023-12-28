import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connects from './config/mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import indexRoutes from './routes/indexRoutes'
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(cors());
connects();
// setup bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/uploads')));
app.use('/uploads', express.static('uploads'));
// route connection
app.use('/', indexRoutes);

// server connection
app.listen(Number(process.env.PORT), () => {
    console.log(`app listening on port ${process.env.PORT}!`);
});