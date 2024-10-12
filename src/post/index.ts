import { Router } from "express";
import { Post } from "./post.controller";
import { validateInputData } from "../middlewares/inputValidator.middleware";
import { createCommentSchema } from "./post.schema";
import { validatePost } from "./post.middleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
const router = Router();

router.post('/:postId/comments', verifyAuthToken, validateInputData(createCommentSchema, 'payload'), validatePost, Post.createComment);

export { router as postRoutes }
