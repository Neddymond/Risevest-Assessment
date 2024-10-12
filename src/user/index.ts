import { Router } from "express";
import { User } from "./user.controller";
import { validateInputData } from "../middlewares/inputValidator.middleware";
import { createUserSchema, createPostSchema, loginUserSchema } from "./user.schema";
import { validateUser } from "./user.middleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
const router = Router();

router.get('/', verifyAuthToken, User.getUsers);
router.get('/:id/posts', verifyAuthToken, validateUser, User.getPosts);
router.get('/topUsers', verifyAuthToken, User.getTopUsers);

router.post('/', validateInputData(createUserSchema, 'payload'), User.createUser);
router.post('/login', validateInputData(loginUserSchema, 'payload'), validateUser, User.login);
router.post('/:id/posts', verifyAuthToken, validateInputData(createPostSchema, 'payload'), validateUser, User.createPost);

export { router as userRoutes }
