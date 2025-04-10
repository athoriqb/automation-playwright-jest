import request from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.API_BASE_URL+'/v1';

export class LoginApi {
    static async loginUser(data: object) {
        return request(baseURL)
            .post('/login')
            .set('x-api-key', process.env.X_API_KEY || '')
            .send(data);
    }
}