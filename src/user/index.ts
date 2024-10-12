import { Router } from "express";
import { User } from "./user.controller";
import { validateInputData } from "../middlewares/inputValidator.middleware";
import { createUserSchema, createPostSchema } from "./user.schema";
import { validateUser } from "./user.middleware";
const router = Router();

router.get('/', User.getUsers);
router.get('/:id/posts', validateUser, User.getPosts);
router.get('/topUsers', User.getTopUsers);

router.post('/', validateInputData(createUserSchema, 'payload'), User.createUser);
router.post('/:id/posts', validateInputData(createPostSchema, 'payload'), validateUser, User.createPost);

export { router as userRoutes }
