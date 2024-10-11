import app from './app';
import { configService } from './config/config.service';
import { db } from './db';

const port = configService.getPort();

app.listen(port, () => {
    console.log(`Server started successfully on port: ${port}`);
    db.runMigrations();
});