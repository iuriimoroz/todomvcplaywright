import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';

test.describe('Mark all items as completed', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.navigate();
    });

    test('Verify that it is possible to mark all items as completed by clicking on mark all checkbox', async ({ page }) => {
        homePage = new HomePage(page);

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Mark all items as completed
        await homePage.markAllTodosAsCompleted();

        // Assert completed todos
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[0])).toHaveClass('completed');
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[1])).toHaveClass('completed');
        await expect(await homePage.getTodoItemLocatorByText(TODO_ITEMS[2])).toHaveClass('completed');

    });
});