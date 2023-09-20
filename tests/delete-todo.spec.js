import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';


test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.navigate();
});

test.describe('Delete items in todo list', () => {
    test('Verify that user can delete completed item/items from todo list', async ({ page }) => {
        const homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Check first item
        const firstTodo = homePage.toDoItemsList.getLocator().first();
        await homePage.toogle.getLocator().first().check();
        await expect(firstTodo).toHaveClass('completed');
        await homePage.toDoCounter.shouldHaveText('2 items left');

        // Assert completed todo
        await expect(firstTodo).toHaveClass('completed');

        // Delete completed first todo
        await homePage.destroyButton.click();

        // Assert that the number of todos reduced
        await homePage.toDoCounter.shouldHaveText('2 items left');
        await homePage.toDoItemsList.shouldHaveText([
            TODO_ITEMS[1],
            TODO_ITEMS[2]
        ]);
    });
});
