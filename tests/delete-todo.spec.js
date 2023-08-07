const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/home-page');
const { TODO_ITEMS } = require('../page-objects/test-data/TODO_ITEMS');
require('dotenv').config();


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
});

test.describe('Delete items in todo list', () => {
    test('Verify that user can delete completed item/items from todo list', async ({ page }) => {
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

        // Assert completed todo
        await expect(firstTodo).toHaveClass('completed');

        // Delete completed first todo
        await page.locator(homePage.DestoyButton).nth(0).click();

        // Assert that the number of todos reduced
        await expect(page.locator(homePage.ToDoCount)).toHaveText('2 items left');
        await expect(page.locator(homePage.ViewLabel)).toHaveText([
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);
    });
});
