import { z } from 'zod';

export const LoginSuccessSchema = z.object({
    data: z.object({
        access_token: z.string(),
        expired_at: z.string(),
        remember_token: z.string(),
    }),
    status: z.string(),
    message: z.string(),
});
export const InvalidLoginCredentials = z.object({
    response: z.object({
        error: z.object({
            code: z.string(),
            message: z.string(),
            type: z.string(),
        }),
        result: z.string(),
        transaction_id: z.string(),
    }),
    message: z.string(),
});
export const InvalidLoginBodyRequest = z.object({
    message: z.string(),
    errors: z.record(z.array(z.string())),
});