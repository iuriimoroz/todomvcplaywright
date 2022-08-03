require('dotenv').config();

class HomePage {
    constructor(page) {
      this.page = page;
      this.NewTodo = '.new-todo';
      this.ViewLabel = '.view label';
      this.ToDoCount = '.todo-count';
      this.MainBody = '.main';
      this.Footer = '.footer';
      this.Toogle = '.toggle';
      this.ToogleAll = '.toggle-all';
      this.ToDoItems = '.todo-list li';
      this.Edit = '.edit';
      this.DestoyButton = '//button[@class="destroy"]';
      this.ClearCompleted = '.clear-completed';
    }
    async navigate() {
        await this.page.goto(process.env.BASE_URL);
    }
    async createDefaultTodos(page, todoItems) {
      for (const item of todoItems) {
          await page.locator(this.NewTodo).fill(item);
          await page.locator(this.NewTodo).press('Enter');
      }
  }
  }
  module.exports = { HomePage };