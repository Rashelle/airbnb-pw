import type { Page, Locator } from '@playwright/test';

type Guests = {
  adults: number,
  children: number
}

type StepperSelectors = {
  increase: Locator,
  reduce: Locator
};

type Action = 'increase' | 'reduce';

type PageSelectors = {
  destinationInput: Locator,
  checkInDate: Locator,
  checkOutDate: Locator,
  guestsSelector: Locator
};


export class BookAirbnb {
  private readonly destinationInput: Locator;
  private readonly checkInDate: Locator;
  private readonly checkOutDate: Locator;
  private readonly guestsSelector: Locator;
  private readonly adultsAmountSteppers : StepperSelectors;
  private readonly childrenAmountSteppers: StepperSelectors;
  private readonly saveSearchButton: Locator;
  private readonly pageSelectors: PageSelectors;
  
  constructor(public readonly page: Page) {
    this.destinationInput = this.page.getByTestId('structured-search-input-field-query');
    this.checkInDate = this.page.getByTestId('structured-search-input-field-split-dates-0');
    this.checkOutDate = this.page.getByTestId('structured-search-input-field-split-dates-1');
    this.guestsSelector = this.page.getByTestId('structured-search-input-field-guests-button');   
    this.adultsAmountSteppers = {
      increase: this.page.getByTestId('stepper-adults-increase-button'),
      reduce: this.page.getByTestId('stepper-adults-reduce-button')
    }
    this.childrenAmountSteppers = {
      increase: this.page.getByTestId('stepper-children-increase-button'),
      reduce: this.page.getByTestId('stepper-children-reduce-button')
    };
    this.saveSearchButton = this.page.getByTestId('structured-search-input-search-button');

    this.pageSelectors = {
      destinationInput: this.destinationInput,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guestsSelector: this.guestsSelector,
    }
  }
  
  getSelectorByKey(selectorKey): Locator {
    return this.pageSelectors[selectorKey];
  }

  async goto() {
    await this.page.goto('https://www.airbnb.com/');
  }


  async addDestination(destination: string) {
    await this.destinationInput.click();
    await this.destinationInput.fill(destination);
    await this.destinationInput.press('Enter');
  }

  async addDates(page: Page, dates: string[]) {
    await page.getByTestId(dates[0]).click();
    await page.getByTestId(dates[1]).click();
    await this.checkOutDate.press('Enter');
  }

  async setGuestsAmount(guests: Guests, {action, delayClick}: { action: Action, delayClick: boolean }) { 
    const delay = delayClick ? 1 : 0;
    this.guestsSelector.click();

    await this.adultsAmountSteppers[action].click({clickCount: guests.adults, delay});
    await this.childrenAmountSteppers[action].click({clickCount: guests.adults});
    await this.guestsSelector.press('Enter');
  }
  
  async saveSearch() {
    await this.saveSearchButton.click();   
  }

  async selectAirbnb(airbnb: string) {
    await this.page.getByTestId(airbnb).first().click(); 
  }

  async gotoSelection() {
    let context = await this.page.context();
    return context.waitForEvent("page");
  }

  // Close unexpected translations pop-up 
  async closePopUp(page: Page) {
    await page.getByRole('button', { name: /Close/i }).click(); 
  }

  async closeSection(page: Page) {
    await page.getByRole('button',  { name: 'Close' }).click();
  }

  async reserve(page: Page) {
    await page.getByRole('button', { name: 'Reserve' }).click();
  }
}