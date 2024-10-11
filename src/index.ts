import express, { Application } from 'express';
import { configService } from './config/config.service';
import { db } from './db';
import { Routes } from './routes';

const port = configService.getPort();

class App {
    public app: Application;
    
    constructor() {
        this.app = express()
    }
}

const app = new App().app;
app.use(express.json());
app.use(Routes);
app.listen(port, () => {
    console.log(`Server started successfully on port: ${port}`);
    db.runMigrations();
});