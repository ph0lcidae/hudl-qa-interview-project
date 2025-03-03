import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly continueButton: Locator;
  private readonly editButton: Locator;
  private readonly forgotPasswordButton: Locator;
  private readonly fpEmailBox: Locator;
  private readonly incorrectEmailError: Locator;
  private readonly incorrectPasswordError: Locator;
  private readonly passwordBox: Locator;
  private readonly usernameBox: Locator;

  constructor(public readonly page: Page) {
    this.continueButton = this.page
      .getByRole("button")
      .filter({ hasText: "Continue" })
      .first();
    this.editButton = this.page.getByLabel("Edit email address");
    this.forgotPasswordButton = this.page.getByText("Forgot Password"); // more resilent selector would be ideal
    this.fpEmailBox = this.page.locator("input#email");
    this.incorrectEmailError = this.page.locator("#error-element-username");
    this.incorrectPasswordError = this.page.locator("#error-element-password");
    this.passwordBox = this.page.locator("input#password");
    this.usernameBox = this.page.locator("input#username");
  }

  public get incorrectEmailLocator() {
    return this.incorrectEmailError;
  }

  public get incorrectPasswordLocator() {
    return this.incorrectPasswordError;
  }

  public get fpEmailBoxLocator() {
    return this.fpEmailBox;
  }

  public get usernameBoxLocator() {
    return this.usernameBox;
  }

  async enterEmail(email: string) {
    await this.usernameBox.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordBox.fill(password);
  }

  async clickEditEmail() {
    await this.editButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
