const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/home-page');
const { TODO_ITEMS } = require('../page-objects/test-data/TODO_ITEMS');
require('dotenv').config();


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
});

test.describe('User can update an item using double click', () => {

    test('Verify that it is possible to edit an item using double click', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(page, TODO_ITEMS);

        // Ensure that items were added
        await expect(page.locator(homePage.ToDoCount)).toHaveText('3 items left');

        // Update second todo item
        const secondTodo = page.locator(homePage.ToDoItems).nth(1);
        await secondTodo.dblclick();
        await expect(secondTodo.locator(homePage.Edit)).toHaveValue(TODO_ITEMS[1]);
        await secondTodo.locator(homePage.Edit).fill('buy some sausages');
        await secondTodo.locator(homePage.Edit).press('Enter');
    
        // Assert the new text value
        await expect(page.locator(homePage.ToDoItems)).toHaveText([
          TODO_ITEMS[0],
          'buy some sausages',
          TODO_ITEMS[2]
        ]);
    });
});
