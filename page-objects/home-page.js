import { BasePage } from '../page-objects';
import { Button, Input, Label, List, Span } from '../page-factory';


exports.HomePage = class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.newTodoField = new Input({page, locator: '.new-todo'});
    this.toDoItemLocator = new Label({page: page, locator: 'label'}).getLocator();
    this.destroyButtonLocator = new Button({page: page, locator: '//button[@class="destroy"]'}).getLocator();
    this.clearCompletedButtonLocator = new Button({page: page, locator: '.clear-completed'}).getLocator();
    this.toDoItemsListLocator = new List({page: page, locator: '.todo-list li'}).getLocator();
    this.toDoCounterLocator = new Span({page: page, locator: '.todo-count'}).getLocator();
    this.toogleLocator = new Input({page: page, locator: '.toggle'}).getLocator();
  }

  async createDefaultTodos(todoItems) {
    const { newTodoField } = this;
    for (const item of todoItems) {
      try {
        await newTodoField.fill(item);
        await newTodoField.press('Enter');
      } catch (error) {
        console.error(`Failed to create todo: ${item}`);
      }
    }
  }
}
