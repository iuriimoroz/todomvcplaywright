# About
This project contains tests for ToDoMVC sample web app (https://todomvc.com). Tests are written
using Playwright test automation framework on JavaScript programming language. Some tests fails as there are bugs in the sample app.

# Test coverage
Following manual tests are automated:
- Positive scenarios:
1) Add new items to todo list:
 - Verify that new items were added to the list
 - Verify that text input field is cleared when a new item was added
 - Verify that footer with current state appears as soon as first item was added
2) Mark some items as completed
 - Verify that user can mark todo item/items as completed
3) User can update an item using double click
 - Verify that it is possible to edit an item using double click
4) User can uncomplete previously completed item
 - Verify that user can make previosly completed item as active
5) Mark all items as completed
 - Verify that it is possible to mark all items as completed by clicking on mark all checkbox
6) Delete items in todo list
 - Verify that user can delete completed item/items from todo list
7) Clear completed items
 - Verify that it is posible to clear comleted items

- Negavive scenarios:
1) Verify that duplicate items are not allowed
2) Verify that a new item can only be added by pressing [Enter] key
3) Verify that empty todo item is not allowed (only spaces)
4) Verify that todo items are not lost after refreshing the page

# Setup
- Install Node.js on your PC from here https://nodejs.org/en/download/
- Clone the repo
- From the project's root folder run `npm install` in order to install project dependencies
- Run `npx playwright install` in order to install supported browsers for Playwright
- .env file contain base url which is pointing to `https://todomvc.com/examples/angular2` - you can change the url in order to test some other samples. Important: this is not a good practice to commit such file, but I did it intentionaly just to simplify the setup.


# Run Tests
- Run `npm run test` to run all tests. Tests are run in headless mode by
  default.
- Run `npm run test:headed` to run all tests in headed mode.
- Run `npm run test:headed <spec name>` to run particular test in headed mode e.g. `npm run test:headed adding-todos.spec`for running adding todos tests.
- Run `npm run test <spec name>` to run particular test in headless mode

# Test report
- In order to see test report run following command `npx playwright show-report`

# Additional info
In order to add new tests/edit existing use following guide. Tests are located in the 'tests' directory - you can add new tests there. Also there is page-objects directory with a file containing page objects for solution (implemented page objects pattern). playwright.config.js file contains configuration for the project - here you can add a new web browser for running tests (currently only chromium is used) or change timeouts for running tests. Other config can be seen inside of the file.

