const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/home-page');
const { TODO_ITEMS } = require('../page-objects/test-data/TODO_ITEMS');
require('dotenv').config();


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
});

test.describe('Mark some todo items as completed', () => {

    test('Verify that user can mark todo item/items as completed', async ({ page }) => {
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

        // Check second item
        const secondTodo = page.locator(homePage.ToDoItems).nth(1);
        await expect(secondTodo).not.toHaveClass('completed');
        await secondTodo.locator(homePage.Toogle).check();
        await expect(page.locator(homePage.ToDoCount)).toHaveText('1 item left');

        // Assert completed todos
        await expect(firstTodo).toHaveClass('completed');
        await expect(secondTodo).toHaveClass('completed');

    });
});
