import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';

test.describe('Negavive scenarios', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.navigate();
    });

    test('Verify that duplicate items are not allowed', async ({}) => {

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Add duplicate item
        await homePage.createTodoItem(TODO_ITEMS[0])

        // Make sure the list still have 3 todos
        await homePage.toDoItemsList.shouldHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);
    });

    test('Verify that empty todo item is not allowed (only spaces)', async ({}) => {

        // Create 1st todo
        await homePage.createTodoItem(TODO_ITEMS[0])

        // Make sure the item was added
        await homePage.toDoItemsList.shouldHaveText(TODO_ITEMS[0]);

        // Try to add an empty todo
        await homePage.createTodoItem('  ')

        // Make sure the item was not added
        await homePage.toDoItemsList.shouldHaveText(TODO_ITEMS[0]);
    });

    test('Verify that todo items are not lost after refreshing the page', async ({}) => {

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Check first item
        await homePage.checkTodoByText(TODO_ITEMS[0]);
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[0])).toHaveClass('completed');
        await homePage.toDoCounter.shouldHaveText('2 items left');
        await homePage.toDoItemsList.shouldHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);

        // Refresh the page
        await homePage.reload();

        // Ensure that the todos state remains the same
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[0])).toHaveClass('completed');
        await homePage.toDoCounter.shouldHaveText('2 items left');
        await homePage.toDoItemsList.shouldHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);
    });
});