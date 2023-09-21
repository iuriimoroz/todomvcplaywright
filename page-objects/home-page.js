import { BasePage } from '../page-objects';
import { Button, Input, Label, List, Span } from '../page-factory';


exports.HomePage = class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.newTodoField = new Input({page, locator: '.new-todo'});
    this.destroyButton = new Button({page: page, locator: '//button[@class="destroy"]'});
    this.toDoCounter = new Span({page: page, locator: '.todo-count'});
    this.toDoItem = new Label({page: page, locator: 'label'});
    this.clearCompletedButton = new Button({page: page, locator: '.clear-completed'});
    this.toDoItemsList = new List({page: page, locator: '.todo-list li'});
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
  async checkTodoByText(todoText) {
    await this.page.locator(`//label[text()="${todoText}"]/..//input[@class="toggle"] `).check();
  }
}
