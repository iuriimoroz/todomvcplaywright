const { test } = require('@playwright/test');
const { Component, BaseComponent } = require('./base-component');

exports.Label = class Label extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
