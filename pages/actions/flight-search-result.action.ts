import { expect, Page } from '@playwright/test';
import { FlightSearchResultLocators} from "../locators/flight-search-result.locator";

export class FlightSearchResultAction {
    constructor(private page: Page) {}

    async verifyVisibleOfFlightSchedule() {
        const bookButtons = this.page.locator(FlightSearchResultLocators.bookButton);
        await bookButtons.first().waitFor({ timeout: 180000 });
        const count = await bookButtons.count();
        expect(count).toBeGreaterThan(0);
    }
}