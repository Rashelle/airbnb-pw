import { test , expect } from './fixtures/bookAirbnbFixture';
import moment from 'moment';
import { getConfirmationDateFormat, getDateTestId, getPickerDisplayDateFormat, sumGuestsAmount } from './test-utils';

const START_DATE = moment().add(1, 'day');
const END_DATE = moment().add(2, 'day');
const TEST_DATA = {destination: 'Paris', guests: {adults: 2, children: 1}, changedGuests: {adults: 2}, dates: [getDateTestId(START_DATE), getDateTestId(END_DATE)] }

test('User should choose airbnb', async ({ bookAirbnb, page }) => {
    // Navigation validation
    await expect(page).toHaveTitle(/Airbnb | Vacation rentals, cabins, beach houses, & more/);
    
    // User chooses his preferences
    await bookAirbnb.addDestination(TEST_DATA.destination);
    await expect(page.getByPlaceholder('Search destinations')).toHaveValue(TEST_DATA.destination);


    await bookAirbnb.addDates(page, TEST_DATA.dates);
    await expect(bookAirbnb.getSelectorByKey('checkInDate').getByText(getPickerDisplayDateFormat(START_DATE))).toBeVisible();
    await expect(bookAirbnb.getSelectorByKey('checkOutDate').getByText(getPickerDisplayDateFormat(END_DATE))).toBeVisible();

    await bookAirbnb.setGuestsAmount(TEST_DATA.guests, {action: 'increase', delayClick: true});
    await expect(page.getByText(`${sumGuestsAmount(TEST_DATA.guests)} Guest`)).toBeVisible()

    await bookAirbnb.saveSearch();

    // Select an airbnb
    await page.waitForURL('**/www.airbnb.com/s/Paris/**');
    await bookAirbnb.selectAirbnb('card-container');

    const confirmationPage = await bookAirbnb.gotoSelection();
    await confirmationPage.waitForLoadState();

    await bookAirbnb.closePopUp(confirmationPage);

    // Validate selection
    await expect(confirmationPage.getByTestId('change-dates-checkIn')).toHaveText(getConfirmationDateFormat(START_DATE));
    await expect(confirmationPage.getByTestId('change-dates-checkOut')).toHaveText(getConfirmationDateFormat(END_DATE));
    await expect(confirmationPage.locator('#GuestPicker-book_it-trigger span').filter({hasText: `${sumGuestsAmount(TEST_DATA.guests)} Guest`})).toBeVisible();


    // Change guest selection
    await confirmationPage.locator('#GuestPicker-book_it-trigger').filter({hasText: 'Guest'}).click();
    await confirmationPage.getByTestId('GuestPicker-book_it-form-children-stepper-decrease-button').click({delay: 1});
    await expect(confirmationPage.locator('#GuestPicker-book_it-trigger span').filter({hasText: `${sumGuestsAmount(TEST_DATA.changedGuests)} Guest`})).toBeVisible();
  
    // Reserve
    await bookAirbnb.closeSection(confirmationPage);
    await bookAirbnb.reserve(confirmationPage);

    // Validate reservation
    await confirmationPage.waitForURL('https://www.airbnb.com/book/stays/**');
    await confirmationPage.locator('#GUEST_PICKER').filter({hasText: `${sumGuestsAmount(TEST_DATA.changedGuests)} Guests`}).isVisible()
});
