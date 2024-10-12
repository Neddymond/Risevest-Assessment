import bcrypt from 'bcrypt';
import { UserWithCredentials } from "../interfaces/user.interface";
import { configService } from "../config/config.service";
import { UserRepository } from "./user.repository";
import { Helpers } from '../helpers/utility.helper';

export class UserService {
    static async createUser(payload: UserWithCredentials) {
        const saltRounds = Number(configService.getValue('SALT_ROUNDS'));
        const hash = bcrypt.hashSync(payload.password, saltRounds);
        payload.password = hash;
        const user = await UserRepository.createUser(payload);
        const token = Helpers.createAuthToken(user);
        return { ...user, token };
    }

    static async loginUser(user: UserWithCredentials, payload: UserWithCredentials) {
        const isMatch = bcrypt.compareSync(payload.password, user.password);
        if (!isMatch) {
            throw new Error('Wrong email or password');
        }
        const token = Helpers.createAuthToken(user);
        delete user.password;
        return{ ...user, token };
    }
}