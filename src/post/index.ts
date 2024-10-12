import { Router } from "express";
import { Post } from "./post.controller";
import { validateInputData } from "../middlewares/inputValidator.middleware";
import { createCommentSchema } from "./post.schema";
import { validatePost } from "./post.middleware";
const router = Router();

router.post('/:postId/comments', validateInputData(createCommentSchema, 'payload'), validatePost, Post.createComment);

export { router as postRoutes }
