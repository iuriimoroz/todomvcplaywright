const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/home-page');
const { TODO_ITEMS } = require('../test-data/TODO_ITEMS');
require('dotenv').config();


test.beforeEach(async ({ page }) => {
	const homePage = new HomePage(page);
    homePage.navigate();
});

test.describe('Add new items to todo list', () => {
    test('Verify that new items were added to the list', async ({ page }) => {
        const homePage = new HomePage(page);
        
        // Create 1st todo
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[0]);
        await page.locator(homePage.NewTodo).press('Enter');

        // Make sure the list only has one todo item
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0]
        ]);

        // Create 2nd todo
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[1]);
        await page.locator(homePage.NewTodo).press('Enter');

        // Make sure the list now has two todo items
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1]
        ]);
    });

    test('Verify that text input field is cleared when a new item was added', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create one todo item
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[0]);
        await page.locator(homePage.NewTodo).press('Enter');

        // Check that input is empty
        await expect(page.locator(homePage.NewTodo)).toBeEmpty();
    });

    test('Verify that footer with current state appears as soon as first item was added', async ({ page }) => {
        const homePage = new HomePage(page);
        
        // Create a todo
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[0]);
        await page.locator(homePage.NewTodo).press('Enter');
    
        // Make sure that main body with the todo appeared as well as a footer
        await expect(page.locator(homePage.MainBody)).toBeVisible();
        await expect(page.locator(homePage.Footer)).toBeVisible();
      });
});
