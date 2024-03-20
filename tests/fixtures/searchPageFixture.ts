import { test as baseTest, expect } from '@playwright/test';
import { SearchPage } from '../poms/SearchPage';

type SearchPageFixtures = {
    searchPage: SearchPage;
};

  
export const test = baseTest.extend<SearchPageFixtures>({
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await searchPage.goto();

         // Use the fixture value in the test.
        await use(searchPage);
    },

});

export { expect, BrowserContext } from '@playwright/test';
