import { Router } from "express";
import { userRoutes } from "../user";
import { postRoutes } from "../post";

const api = Router();

api.use('/users', userRoutes);
api.use('/posts', postRoutes);

export { api as Routes };