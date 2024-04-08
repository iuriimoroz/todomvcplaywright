import { test } from '@playwright/test';
import { HomePage } from '../page-objects';
import { TODO_ITEMS } from '../test-data/todo_items';

test.describe('User can update an item using double click', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        homePage.navigate();
    });

    test('Verify that it is possible to edit an item using double click', async ({}) => {

        // Create 3 items
        await homePage.createDefaultTodos(TODO_ITEMS);

        // Ensure that items were added
        await homePage.toDoCounter.shouldHaveText('3 items left');

        // Update second todo item
        await homePage.updateTodoItem(TODO_ITEMS[1], 'buy some sausages');
    
        // Assert the new text value
        await homePage.toDoItemsList.shouldHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2]
          ]);
    });
});