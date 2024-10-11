import express, { Application } from 'express';
import { Routes } from './routes';

class App {
    public app: Application;
    
    constructor() {
        this.app = express()
    }
}

const app = new App().app;
app.use(express.json());
app.use(Routes);

export default app;
