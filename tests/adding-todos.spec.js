import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';

test.describe('Add new items to todo list', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.navigate();

    });
    test('Verify that new items were added to the list', async ({ page }) => {
        homePage = new HomePage(page);
        
        // Create 1st todo
        await homePage.createTodoItem(TODO_ITEMS[0])

        // Make sure the list only has one todo item
        await homePage.toDoItemsList.shouldHaveText(TODO_ITEMS[0]);

        // Create 2nd todo
        await homePage.createTodoItem(TODO_ITEMS[1])

        // Make sure the list now has two todo items
        await homePage.toDoItemsList.shouldHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1]
        ]);
    });

    test('Verify that text input field is cleared when a new item was added', async ({ page }) => {
        homePage = new HomePage(page);

        // Create one todo item
        await homePage.createTodoItem(TODO_ITEMS[0])

        // Check that input is empty
        await expect(homePage.newTodoField.getLocator()).toBeEmpty();
    });

    test('Verify that footer with current state appears as soon as first item was added', async ({ page }) => {
        homePage = new HomePage(page);
        
        // Create a todo
        await homePage.createTodoItem(TODO_ITEMS[0])
    
        // Make sure that main body with the todo appeared as well as a footer
        await expect(homePage.body.getLocator()).toBeVisible();
        await expect(homePage.footer.getLocator()).toBeVisible();
      });
});