const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/home-page');
const { TODO_ITEMS } = require('../test-data/TODO_ITEMS');
require('dotenv').config();


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
});

test.describe('Mark all items as completed', () => {

    test('Verify that it is possible to mark all items as completed by clicking on mark all checkbox', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(page, TODO_ITEMS);

        // Ensure that items were added
        await expect(page.locator(homePage.ToDoCount)).toHaveText('3 items left');

        // Mark all items as completed
        await expect(page.locator(homePage.ToogleAll)).toBeVisible();
        await page.locator(homePage.ToogleAll).check();
        await expect(homePage.ToogleAll).toBeChecked();

        // Assert completed todos
        const firstTodo = page.locator(homePage.ToDoItems).nth(0);
        const secondTodo = page.locator(homePage.ToDoItems).nth(1);
        const thirdTodo = page.locator(homePage.ToDoItems).nth(2);
        await expect(firstTodo).toHaveClass('completed');
        await expect(secondTodo).toHaveClass('completed');
        await expect(thirdTodo).toHaveClass('completed');

    });
});
