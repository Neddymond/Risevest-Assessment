import { Router } from "express";
import { User } from "./user.controller";
import { validateInputData } from "../middlewares/inputValidator.middleware";
import { createUserSchema } from "./user.schema";
const router = Router();

router.post('/', validateInputData(createUserSchema, 'payload'), User.createUser);
router.get('/', User.getUsers);

export { router as userRoutes }
