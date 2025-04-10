import { test, expect } from '@playwright/test';
import { LoginAction } from '../../pages/actions/login.action';
import { BookFlightAction } from '../../pages/actions/book-flight.action';
import { FlightSearchResultAction } from "../../pages/actions/flight-search-result.action";
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('End to end search flight', () => {
    test('should login successfully and land on Book Flight page', async ({ page }) => {
        const login = new LoginAction(page);
        const bookFlight = new BookFlightAction(page);
        const flightSearchResult = new FlightSearchResultAction(page);

        await test.step('Login to TruTrip', async () => {
            await page.goto(process.env.BASE_URL as string);
            await login.login(
                process.env.USER_EMAIL as string,
                process.env.USER_PASSWORD as string
            );
            await bookFlight.verifyOnBookFlightPage();
        });

        await test.step('should able to search flight in one way trip', async () => {
            test.setTimeout(180000);
            await bookFlight.fillCityAndSelect('ORIGIN');
            await bookFlight.selectTripType('oneway')
            await bookFlight.fillCityAndSelect('DESTINATION');
            await bookFlight.clickSelectedDate();
            await bookFlight.clickFindFlightButton();
            await flightSearchResult.verifyVisibleOfFlightSchedule();
        });
    });
});