const { test } = require('@playwright/test');
const { Component, BaseComponent } = require('./base-component');

exports.List = class List extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
