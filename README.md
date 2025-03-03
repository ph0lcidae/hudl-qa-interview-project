# Hudl Login Test Suite

## Setup

This suite depends on:
- Playwright
- TypeScript
- Node >= 23

We use the `dotenv` node package here for `.env` file management. 

Dependencies should install by running `npm install` after pulling down this repository, but if it doesn't work, try:

```bash
npm i dotenv --save-dev
```

Please see the example `.env` file and make a copy of it (remove the .example at the end), then fill it out with your test credentials before you run the tests or they won't work.
**DO NOT** commit your actual `.env` file.

## Running

Tests can be run in headless mode on all browsers with:

```bash
npx playwright test
```

If you'd like to run headed and watch the tests run, use the `--headed` option. 
If you'd like to specify a browser project, use the `--project` option (e.g. `--project firefox`). Available options include `chromium`, `firefox`, and `webkit`.

For example, if you'd like to run headed tests with Chromium:
```bash
npx playwright test --headed --project chromium
```

## Scope

This suite includes basic functional tests for username & password authentication to Hudl Coach along with a few negative cases and a basic security test for cross-site scripting.

Social login/OAuth tests, SSO, and API tests are out of scope for this suite. In addition, this suite largely ignores performance, any kind of load test, and accessibility. In a real situation, I'd ideally like to add automated accessibility tests at minimum, and perhaps include API tests and a small performance suite insofar as it's relevant.

## Notes

This is a pretty basic suite; I've included a simple login page fixture for the sake of readability and as an example of how I would implement this in a larger project. Ordinarily I would have such a page object inherit from a `BasePage` superclass or similar for better extensibility and a more obvious chain of inheritance, but for the sake of simplicity I have omitted that here.

*Recommendation:* The error messages for an email that's associated with an account but an incorrect password vs. an email that isn't associated with an account are different. This could be a vector for a credential stuffing attack whereby a bad actor could use the difference in message to determine whether a given email has a Hudl account associated with it. I recommend that these two error states have the same error message.