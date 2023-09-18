require('dotenv').config();
const { BasePage } = require('./base-page');
const { Button } = require('../page-factory/button')
const { Input } = require('../page-factory/input')
const { Label } = require('../page-factory/label')
const { List } = require('../page-factory/list')
const { Span } = require('../page-factory/span')

exports.HomePage = class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.newTodoField = new Input({page: page, locator: '.new-todo'});
    this.item = new Label({page: page, locator: 'label'});
    this.destroyButton = new Button({page: page, locator: '//button[@class="destroy"]', nth: 0});
    this.clearCompletedButton = new Button({page: page, locator: '.clear-completed'});
    this.toDoItemsList = new List({page: page, locator: '.todo-list li'});
    this.toDoCounter = new Span({page: page, locator: '.todo-count'});
    this.toogle = new Input({page: page, locator: '.toggle'});
  }

  async createDefaultTodos(todoItems) {
    for (const item of todoItems) {
      await this.newTodoField.fill(item);
      await this.newTodoField.press('Enter');
    }
  }
}
