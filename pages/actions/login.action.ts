import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/login.locator';

export class LoginAction {
    constructor(private page: Page) {}

    async login(email: string, password: string) {
        await this.page.fill(LoginLocators.emailInput, email, { timeout: 10000 });
        await this.page.fill(LoginLocators.passwordInput, password);
        await this.page.click(LoginLocators.loginButton);
    }
}