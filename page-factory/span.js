import '@playwright/test';
import { BaseComponent } from '../page-factory';

exports.Span = class Span extends BaseComponent {
  constructor({ page, locator }) {
    super({ page, locator });
  }
}
