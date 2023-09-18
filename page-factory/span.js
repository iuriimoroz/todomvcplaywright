const { test } = require('@playwright/test');
const { Component, BaseComponent } = require('./base-component');

exports.Span = class Span extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
