import jwt from 'jsonwebtoken';
import request from 'supertest'
import app from '../app'
import { PostRepository } from './post.repository';

jest.mock('./post.repository');
jest.mock('jsonwebtoken');

afterEach(() => {
    jest.resetAllMocks();
});

describe('Post Controller', () => {
    const token = 'Bearer randomauthtoken';
    const decodedToken = {
        id: 1,
        email: 'neddy@gmail.com',
        iat: 1728727627
    }

    describe('Create Comment', () => {
        afterEach(() => {
            jest.restoreAllMocks()
        });
        
        it('should return error if content is not provided', async () => {
            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);

            const res = await request(app)
                .post('/posts/1/comments')
                .set({ Authorization: token })
                .send();

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('content is required');
        });
        
        it('should return error if post provided does not exist', async () => {
            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);

            const res = await request(app)
                .post('/posts/2/comments')
                .set({ Authorization: token })
                .send({
                    content: 'what are the relationships between the tables?'
                });

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('Post provided does not exist');
        });

        it('should create a new comment successfully', async () => {
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            const comment = {
                id: 1,
                userId: 1,
                postId: 1,
                content: 'what are the relationships between the tables?'
            };

            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);
            (PostRepository.getPostbyId as jest.Mock).mockResolvedValue(post);
            (PostRepository.createComment as jest.Mock).mockResolvedValue(comment);

            const res = await request(app)
                .post('/posts/1/comments')
                .set({ Authorization: token })
                .send({
                    content: 'what are the relationships between the tables?'
                });

            expect(res.status).toEqual(201);
            expect(res.body.message).toEqual('Comment created successfully');
        });
    });
});