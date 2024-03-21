import { test as baseTest, expect } from '@playwright/test';
import { BookAirbnb } from '../poms/BookAirbnb';

type BookAirbnbFixtures = {
    bookAirbnb: BookAirbnb;
};
  
export const test = baseTest.extend<BookAirbnbFixtures>({
    bookAirbnb: async ({ page }, use) => {
        const bookAirbnb = new BookAirbnb(page);
        await bookAirbnb.goto();

         // Use the fixture value in the test.
        await use(bookAirbnb);
    },

});

export { expect, BrowserContext } from '@playwright/test';
