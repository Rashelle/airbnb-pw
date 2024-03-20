import type { Page, Locator } from '@playwright/test';

export class SearchPage {
  private readonly destinationInput: Locator;
  private readonly checkInDate: Locator;
  private readonly checkOutDate: Locator;
  private readonly guestsSelector: Locator;
  private readonly addGuestsStepper: Locator;
  private readonly saveSearchButton: Locator;
  
  constructor(public readonly page: Page) {
    this.destinationInput = this.page.getByTestId('structured-search-input-field-query');
    this.checkInDate = this.page.getByTestId('structured-search-input-field-split-dates-0');
    this.checkOutDate = this.page.getByTestId('structured-search-input-field-split-dates-1');
    this.guestsSelector = this.page.getByTestId('structured-search-input-field-guests-button');   
    this.addGuestsStepper = this.page.getByTestId('stepper-adults-increase-button');
    this.saveSearchButton = this.page.getByTestId('structured-search-input-search-button');
  }

  async goto() {
    await this.page.goto('https://www.airbnb.com/');
  }


  async addDestination(destination: string) {
    await this.destinationInput.click();
    await this.destinationInput.fill(destination);
    await this.destinationInput.press('Enter');
  }

  async addDates(dates: string[]) {
    await this.page.getByTestId(dates[0]).click();
    await this.page.getByTestId(dates[1]).click();
    await this.checkOutDate.press('Enter');
  }

  async addGuests(guestAmount: number) { 
    this.guestsSelector.click();
    await this.addGuestsStepper.click({clickCount: guestAmount});
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
}