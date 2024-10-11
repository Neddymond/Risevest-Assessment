import request from 'supertest'
import app from '../app'
import { UserRepository } from './user.repository';

jest.mock('./user.repository');

afterEach(() => {
    jest.resetAllMocks();
});

describe('User Controller', () => {
    describe('Create User', () => {
        it('should return error if firstName is not provided', async () => {
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            };

            (UserRepository.createUser as jest.Mock).mockResolvedValue(user);

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
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            };

            (UserRepository.createUser as jest.Mock).mockResolvedValue(user);

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
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            };

            (UserRepository.createUser as jest.Mock).mockResolvedValue(user);

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
                email: 'neddy@gmail.com'
            };

            (UserRepository.createUser as jest.Mock).mockResolvedValue(user);

            const res = await request(app)
                .post('/users')
                .send({
                    firstName: 'Chinedu',
                    lastName: 'Ikechi',
                    email: 'neddy@gmail.com'
                });

            expect(res.status).toEqual(201);
            expect(res.body.message).toEqual('User created successfully');
        });
    });

    describe('Get Users', () => {
        it('should fetch all users successfully', async () => {
            const user = {
                id: 1,
                firstName: 'Chinedu',
                lastName: 'Ikechi',
                email: 'neddy@gmail.com'
            };

            (UserRepository.createUser as jest.Mock).mockResolvedValue(user);

            const res = await request(app)
                .get('/users')
                .send();

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Users fetched successfully');
        });
    });

    describe('Create Post', () => {
        afterEach(() => {
            jest.restoreAllMocks()
        });
        
        it('should return error if title is not provided', async () => {
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .post('/users/1/posts')
                .send();

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('title is required');
        });
        
        it('should return error if content is not provided', async () => {
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .post('/users/1/posts')
                .send({ title: 'Interview' });

            expect(res.status).toEqual(422);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('content is required');
        });
        
        it('should return error if user provided does not exist', async () => {
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .post('/users/2/posts')
                .send({
                    title: 'Interview',
                    content: 'Design a database with three tables: Users, Posts, and Comments.'
                });

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('User provided does not exist');
        });

        it('should create a new post successfully', async () => {
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (UserRepository.getUserbyId as jest.Mock).mockResolvedValue(post);
            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .post('/users/1/posts')
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
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            const res = await request(app)
                .get('/users/2/posts')
                .send();
                console.log('resxxz --> ', res.body);

            expect(res.status).toEqual(400);
            expect(res.body.status).toEqual(false);
            expect(res.body.message).toEqual('User provided does not exist');
        });
        
        it('should fetch all posts of a user successfully', async () => {
            const post = {
                id: 1,
                title: 'Interview',
                content: 'Design a database with three tables: Users, Posts, and Comments.',
                userid: 1
            };

            (UserRepository.getUserbyId as jest.Mock).mockResolvedValue(post);
            (UserRepository.createPost as jest.Mock).mockResolvedValue(post);

            const res = await request(app)
                .get('/users/1/posts')
                .send();

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Posts fetched successfully');
        });
    });
});