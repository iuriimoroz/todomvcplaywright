require('dotenv').config();
const { BasePage } = require('./base-page');

exports.HomePage = class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.NewTodo = '.new-todo';
    this.ViewLabel = '.view label';
    this.ToDoCount = '.todo-count';
    this.MainBody = '.main';
    this.Footer = '.footer';
    this.Toogle = '.toggle';
    this.ToogleAll = '.toggle-all';
    this.ToDoItems = '.todo-list li';
    this.Edit = '.edit';
    this.DestroyButton = '//button[@class="destroy"]';
    this.ClearCompleted = '.clear-completed';
  }

  async createDefaultTodos(page, todoItems) {
    for (const item of todoItems) {
      await page.locator(this.NewTodo).fill(item);
      await page.locator(this.NewTodo).press('Enter');
    }
  }
}
