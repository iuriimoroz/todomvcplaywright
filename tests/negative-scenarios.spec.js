const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/home-page');
require('dotenv').config();


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
});

const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
];

test.describe('Negavive scenarios', () => {

    test('Verify that duplicate items are not allowed', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(page, TODO_ITEMS);

        // Ensure that items were added
        await expect(page.locator(homePage.ToDoCount)).toHaveText('3 items left');
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);

        // Add duplicate item
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[0]);
        await page.locator(homePage.NewTodo).press('Enter');

        // Make sure the list still have 3 todos
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);
    });

    test('Verify that a new item can only be added by pressing [Enter] key', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 1st todo
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[0]);
        await page.locator(homePage.NewTodo).press('Enter');

        // Make sure the item was added
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0]
        ]);

        // Try to add a todo by pressing some other button
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[1]);
        await page.locator(homePage.NewTodo).press('Space');

        // Make sure the item was not added
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0]
        ]);
    });

    test('Verify that empty todo item is not allowed (only spaces)', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 1st todo
        await page.locator(homePage.NewTodo).fill(TODO_ITEMS[0]);
        await page.locator(homePage.NewTodo).press('Enter');

        // Make sure the item was added
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0]
        ]);

        // Try to add an empty todo
        await page.locator(homePage.NewTodo).fill('   ');
        await page.locator(homePage.NewTodo).press('Enter');

        // Make sure the item was not added
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0]
        ]);
    });
    test('Verify that todo items are not lost after refreshing the page', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(page, TODO_ITEMS);

        // Ensure that items were added
        await expect(page.locator(homePage.ToDoCount)).toHaveText('3 items left');

        // Check first item
        const firstTodo = page.locator(homePage.ToDoItems).nth(0);
        await firstTodo.locator(homePage.Toogle).check();
        await expect(firstTodo).toHaveClass('completed');
        await expect(page.locator(homePage.ToDoCount)).toHaveText('2 items left');
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);

        // Refresh the page
        await page.reload();

        // Ensure that the todos state remains the same
        await expect(firstTodo).toHaveClass('completed');
        await expect(page.locator(homePage.ToDoCount)).toHaveText('2 items left');
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);
    });
});