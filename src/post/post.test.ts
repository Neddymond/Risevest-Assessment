import request from 'supertest'
import app from '../app'
import { PostRepository } from './post.repository';

jest.mock('./post.repository');

afterEach(() => {
    jest.resetAllMocks();
});

describe('Post Controller', () => {
    describe('Create Comment', () => {
        afterEach(() => {
            jest.restoreAllMocks()
        });
        
        it('should return error if content is not provided', async () => {
            const res = await request(app)
                .post('/posts/1/comments')
                .send();

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('content is required');
        });
        
        it('should return error if post provided does not exist', async () => {
            const res = await request(app)
                .post('/posts/2/comments')
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

            (PostRepository.getPostbyId as jest.Mock).mockResolvedValue(post);
            (PostRepository.createComment as jest.Mock).mockResolvedValue(comment);

            const res = await request(app)
                .post('/posts/1/comments')
                .send({
                    content: 'what are the relationships between the tables?'
                });

            expect(res.status).toEqual(201);
            expect(res.body.message).toEqual('Comment created successfully');
        });
    });
});