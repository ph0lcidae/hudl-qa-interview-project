import { test, expect } from "../fixtures/login-fixtures";

test.describe("Login flow tests", () => {
  const fakeEmail = "wherecaniget@nachos.lol";

  test("should be able to login with valid credentials", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail(process.env.USERNAME);
    await loginPage.clickContinue();

    await expect(page).toHaveURL(/password/);

    await loginPage.enterPassword(process.env.PASSWORD);
    await loginPage.clickContinue();

    await expect(page).toHaveURL("https://www.hudl.com/home");
  });

  test("should receive an error message for invalid password", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail(process.env.USERNAME);
    await loginPage.clickContinue();

    await expect(page).toHaveURL(/password/);

    await loginPage.enterPassword("thisisthewrongpassword");
    await loginPage.clickContinue();

    await expect(loginPage.incorrectPasswordLocator).toBeVisible();
    await expect(loginPage.incorrectPasswordLocator).toHaveText(
      "Your email or password is incorrect. Try again."
    );
  });

  test("should receive an error message for incorrectly formatted email", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail("notarealemailhahaha");
    await loginPage.clickContinue();

    await expect(loginPage.incorrectEmailLocator).toBeVisible();
    await expect(loginPage.incorrectEmailLocator).toHaveText(
      "Enter a valid email."
    );
  });

  test("should be denied login for email not associated with an account", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail(fakeEmail);
    await loginPage.clickContinue();

    await expect(page).toHaveURL(/password/);

    await loginPage.enterPassword("thisisthewrongpassword");
    await loginPage.clickContinue();

    await expect(loginPage.incorrectPasswordLocator).toBeVisible();
    await expect(loginPage.incorrectPasswordLocator).toHaveText(
      "Incorrect username or password."
    );
  });

  test("should be able to request password reset", async ({
    loginPage,
    page,
  }) => {
    // use a fake email here so we don't spam a real email inbox
    await loginPage.enterEmail(fakeEmail);
    await loginPage.clickContinue();

    await loginPage.clickForgotPassword();

    await expect(page).toHaveURL(/reset-password/);

    // check that email is auto-filled
    await expect(loginPage.fpEmailBoxLocator).toHaveValue(fakeEmail);

    await loginPage.clickContinue();

    await expect(page.getByRole("presentation")).toHaveText("Check Your Email");
  });

  test("should be able to edit email address", async ({
    loginPage,
    page,
  }) => {
    await loginPage.enterEmail(process.env.USERNAME);
    await loginPage.clickContinue();

    await expect(page).toHaveURL(/password/);

    await loginPage.clickEditEmail();

    await expect(page).toHaveURL(/identifier/);

    await expect(loginPage.usernameBoxLocator).toBeEditable();
  });
});
