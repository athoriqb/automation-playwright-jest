import { expect, Page } from '@playwright/test';
import { BookFlightLocators } from '../locators/book-flight.locator';

export class BookFlightAction {
    constructor(private page: Page) {}

    async verifyOnBookFlightPage() {
        await expect(this.page.locator(BookFlightLocators.departFromInput)).toBeVisible({ timeout: 10000 });
    }

    async fillCityAndSelect(type: 'ORIGIN' | 'DESTINATION') {
        const city = (type === 'ORIGIN'
            ? process.env.ORIGIN_CITY
            : process.env.DESTINATION_CITY)?.toLowerCase();
        if (!city) {
            throw new Error(`Missing environment variable for ${type}_CITY`);
        }
        const inputSelector =
            type === 'ORIGIN'
                ? BookFlightLocators.departFromInput
                : BookFlightLocators.destinationInput;

        await this.page.fill(inputSelector, city);
        await this.page.waitForSelector(BookFlightLocators.dropdownOptionByText(city), { timeout: 8000 });
        const matchingOptions = this.page.locator(BookFlightLocators.dropdownOptions, {
            hasText: new RegExp(city, 'i')
        });
        await matchingOptions.first().click();
    }

    async clickFindFlightButton() {
        await this.page.click(BookFlightLocators.findFlightButton);
    }

    async clickSelectedDate() {
        await this.page.waitForSelector(BookFlightLocators.selectedDate,{ timeout: 8000 });
        await this.page.click(BookFlightLocators.selectedDate);
    }

    async selectTripType(type: 'oneway' | 'roundtrip' | 'multicity') {
        const expectedTextMap = {
            oneway: 'One-Way',
            roundtrip: 'Round Trip',
            multicity: 'Multi City',
        };

        const expectedText = expectedTextMap[type];
        const dropdown = this.page.locator(BookFlightLocators.tripTypeDropdown).nth(0);

        await dropdown.waitFor({ state: 'visible', timeout: 10000 });

        const currentValue = await dropdown.textContent();
        const normalizedCurrent = currentValue?.toLowerCase().replace(/[-\\s]/g, '');
        const normalizedExpected = type.toLowerCase();

        if (normalizedCurrent === normalizedExpected) {
            console.log(`Trip type "${type}" is already selected.`);
            return;
        }

        await dropdown.click();
        const optionLocator = this.page.locator(BookFlightLocators.tripTypeOption(type));
        await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
        await optionLocator.click();
    }
}
