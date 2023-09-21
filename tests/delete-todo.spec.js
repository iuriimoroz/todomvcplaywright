import { test } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';

test.describe('Delete items in todo list', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.navigate();
    });

    test('Verify that user can delete completed item/items from todo list', async ({ page }) => {
        homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Check first item
        await homePage.checkTodoByText(TODO_ITEMS[0]);
        await homePage.toDoCounter.shouldHaveText('2 items left');

        // Delete completed first todo
        await homePage.destroyButton.click();

        // Assert that the number of todos reduced
        await homePage.toDoItemsList.shouldHaveText(TODO_ITEMS.slice(1));
    });
});
