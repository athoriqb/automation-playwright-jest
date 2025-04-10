import { LoginApi } from '../../api/login.api';
import { LoginSuccessSchema,InvalidLoginCredentials,InvalidLoginBodyRequest } from "../../schemas/login.schema";
import userData from '../../test-data/user-data.json';

describe('Login API Tests', () => {
    test('Login with valid credentials', async () => {
        const res = await LoginApi.loginUser(userData.validUser);
        const parsed = LoginSuccessSchema.safeParse(res.body);
        expect(res.status).toBe(200);
        expect(parsed.success).toBe(true);
        expect(res.body.status).toBe('success');
        expect(res.body.data.access_token).toBeTruthy();
    });
    test('Login with missing email', async () => {
        const res = await LoginApi.loginUser(userData.invalidUser_missingEmail);
        const parsed = InvalidLoginBodyRequest.safeParse(res.body);
        expect(res.status).toBe(422);
        if (parsed.success) {
            expect(parsed.data.errors).toHaveProperty('email');
        }
        expect(res.body.message).toBe('The given data was invalid.');
        expect(res.body.errors.email[0]).toBe('The email field is required.');
    });
    test('Login with wrong password', async () => {
        const res = await LoginApi.loginUser(userData.invalidUser_wrongPassword);
        const parsed = InvalidLoginCredentials.safeParse(res.body);
        expect(res.status).toBe(424);
        expect(parsed.success).toBe(true);
        expect(res.body.message).toBe('Login Failed : email / password incorrect');
    });
    test('Login with missing password', async () => {
        const res = await LoginApi.loginUser(userData.invalidUser_emptyPassword);
        const parsed = InvalidLoginBodyRequest.safeParse(res.body);
        expect(res.status).toBe(422);
        if (parsed.success) {
            expect(parsed.data.errors).toHaveProperty('password');
        }
        expect(res.body.message).toBe('The given data was invalid.');
        expect(res.body.errors.password[0]).toBe('The password field is required.');
    });
});