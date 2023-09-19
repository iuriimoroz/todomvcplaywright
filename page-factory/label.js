import '@playwright/test';
import { BaseComponent } from '../page-factory';

exports.Label = class Label extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
