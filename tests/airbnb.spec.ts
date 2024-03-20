// Search for a Stay: Navigate to Airbnb's website and perform a search by specifying a destination, dates (tomorrow's date+1), and number of guests (2 adults + 1 child). Confirm that the search results appear.
// Select a Listing: From the search results, select and enter the page of the highest-rated listing (choose the first one if multiple have the same rating).
// Confirm Booking Details: Validate the information on the listing page, ensuring it matches the selected dates and number of guests.
// Adjust and Verify Guest Count: Decrease the number of child guests and confirm that the guest count updates correctly.
// Change Booking Dates: Attempt to adjust the booking dates to a week from the current date. If these dates are not available, retain the original dates.
// Reserve and Validate: Click the "Reserve" button, then confirm that the page URL has changed to a reservation URL and includes the accurate number of adults.

import { test , expect } from './fixtures/searchPageFixture';
import moment from 'moment';
import { getDateTestId } from './test-utils';

test('User should choose airbnb', async ({ searchPage, page }) => {
    // Navigation validation
    await expect(page).toHaveTitle(/Airbnb | Vacation rentals, cabins, beach houses, & more/);
    
    // User chooses his preferences
    await searchPage.addDestination('Paris');
    await expect(page.getByPlaceholder('Search destinations')).toHaveValue('Paris');

    const startDate = moment().add(1, 'day');
    const endDate = moment().add(2, 'day');

    await searchPage.addDates([getDateTestId(startDate), getDateTestId(endDate)]);
    await expect(page.getByTestId('structured-search-input-field-split-dates-0').getByText('Mar 21')).toBeVisible();
    await expect(page.getByTestId('structured-search-input-field-split-dates-1').getByText('Mar 22')).toBeVisible();

    await searchPage.addGuests(1);
    await expect(page.getByText('1 Guest')).toBeVisible()

    await searchPage.saveSearch();

    // Select an airbnb
    await page.waitForURL('**/www.airbnb.com/s/Paris/**');
    await searchPage.selectAirbnb('card-container');

    const confirmationPage = await searchPage.gotoSelection();
    await confirmationPage.waitForLoadState();

    await searchPage.closePopUp(confirmationPage);

    // Validate selection
    await expect(confirmationPage.getByTestId('change-dates-checkIn')).toHaveText('3/21/2024');
    await expect(confirmationPage.getByTestId('change-dates-checkOut')).toHaveText('3/22/2024');
    await expect(confirmationPage.locator('#GuestPicker-book_it-trigger span').filter({hasText: '1 Guest'})).toBeVisible();

    // // Change selection
    // // await confirmationPage.getByLabel('GuestPicker-book_it-trigger').click();
    // await expect(page.getByRole('button', { name: 'Guest' })).toBeVisible();
    // // await confirmationPage.mouse.move(0, -100);
    // await confirmationPage.getByTestId('uestPicker-book_it-form-children-stepper-increase-button').click();
});
