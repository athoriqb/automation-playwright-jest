import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const isHeadless = process.env.HEADLESS !== 'false';

export default defineConfig({
    testDir: './tests/web',
    timeout: 30000,
    retries: 0,
    use: {
        headless: isHeadless,
        baseURL: process.env.BASE_URL,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'on',
        httpCredentials: {
            username: process.env.BASIC_AUTH_USER || '',
            password: process.env.BASIC_AUTH_PASS || ''
        },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    },
    reporter: [['html', { outputFolder: 'reports', open: 'never' }]]
});