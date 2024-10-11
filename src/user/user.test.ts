import request from 'supertest'
import app from '../app'
import { UserRepository } from './user.repository';

jest.mock('./user.repository');

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
            console.log('resxx --> ', res.body);

            expect(res.status).toEqual(201);
            expect(res.body.data.message).toEqual('User created successfully');
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
            expect(res.body.data.message).toEqual('Users fetched successfully');
        })
    });
});