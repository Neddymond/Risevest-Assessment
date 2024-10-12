import jwt from 'jsonwebtoken';
import request from 'supertest'
import app from '../app'
import { UserRepository } from './user.repository';

jest.mock('./user.repository');
jest.mock('jsonwebtoken');

afterEach(() => {
    jest.resetAllMocks();
});

describe('User Controller', () => {
    const token = 'Bearer randomauthtoken';
    const decodedToken = {
        id: 1,
        email: 'neddy@gmail.com',
        iat: 1728727627
    }

    describe('Create User', () => {
        it('should return error if firstName is not provided', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    lastName: 'Ikechi',
                    email: 'neddy@gmail.com'
                });

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('firstName is required');
        });
        
        it('should return error if lastName is not provided', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    firstName: 'Chinedu',
                    email: 'neddy@gmail.com'
                });

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('lastName is required');
        });
        
        it('should return error if email is not provided', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    firstName: 'Chinedu',
                    lastName: 'Ikechi'
                });

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('email is required');
        });

        it('should create a new user successfully', async () => {
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com',
            };

            (UserRepository.createUser as jest.Mock).mockResolvedValue(user);

            const res = await request(app)
                .post('/users')
                .send({
                    firstName: 'Chinedu',
                    lastName: 'Ikechi',
                    email: 'neddy@gmail.com',
                    password: '12345'
                });
            expect(res.status).toEqual(201);
            expect(res.body.message).toEqual('User created successfully');
        });
    });

    describe('Get Users', () => {
        it('should fetch all users successfully', async () => {
            const users = [{
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            }];

            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);
            (UserRepository.createUser as jest.Mock).mockResolvedValue(users);

            const res = await request(app)
                .get('/users')
                .set({ Authorization: token })
                .send();

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Users fetched successfully');
        });
    });

    describe('Create Post', () => {
        it('should return error if title is not provided', async () => {
            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);

            const res = await request(app)
                .post('/users/1/posts')
                .set({ Authorization: token })
                .send();

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('title is required');
        });
        
        it('should return error if content is not provided', async () => {
            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);

            const res = await request(app)
                .post('/users/1/posts')
                .set({ Authorization: token })
                .send({ title: 'Interview' });

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('content is required');
        });
        
        it('should return error if user provided does not exist', async () => {
            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);

            const res = await request(app)
                .post('/users/2/posts')
                .set({ Authorization: token })
                .send({
                    title: 'Interview',
                    content: 'Design a database with three tables: Users, Posts, and Comments.'
                });

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('User provided does not exist');
        });

        it('should create a new post successfully', async () => {
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            };

            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);
            (UserRepository.getUser as jest.Mock).mockResolvedValue(user);
            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .post('/users/1/posts')
                .set({ Authorization: token })
                .send({
                    title: 'Interview',
                    content: 'Design a database with three tables: Users, Posts, and Comments.'
                });

            expect(res.status).toEqual(201);
            expect(res.body.message).toEqual('Post created successfully');
        });
    });

    describe('Get User Posts', () => {
        it('should return error if user provided does not exist', async () => {
            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);

            const res = await request(app)
                .get('/users/2/posts')
                .set({ Authorization: token })
                .send();

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('User provided does not exist');
        });
        
        it('should fetch all posts of a user successfully', async () => {
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            };

            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);
            (UserRepository.getUser as jest.Mock).mockResolvedValue(user);
            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .get('/users/1/posts')
                .set({ Authorization: token })
                .send();

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Posts fetched successfully');
        });
    });

    describe('Get Top User', () => {
        it('should fetch the top three users successfully', async () => {
            const topUsers = [
                {
                    userId: 1,
                    firstName: 'Chinedu',
                    lastName: 'Ikechi',
                    postCount: 1,
                    latestComment: 'what are the relationships between the tables?'
                },
                {
                    userid: 2,
                    firstName: 'Eke',
                    lastName: 'Urum',
                    postCount: 1,
                    latestComment: 'next interview stage'
                }
            ];

            (jwt.verify as jest.Mock).mockResolvedValue(decodedToken);
            (UserRepository.getTopUsers as jest.Mock).mockResolvedValue(topUsers);

            const res = await request(app)
                .get('/users/topUsers')
                .set({ Authorization: token })
                .send();

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Top users fetched successfully');
        });
    });
});