import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

type LoginFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto("https://www.hudl.com");
    await page.getByTestId("login-select").click();
    await page.getByTestId("login-hudl").click();

    // this is hacky but we're just checking we're on the username entry part of the login flow
    await page.waitForURL(/identifier/);
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
