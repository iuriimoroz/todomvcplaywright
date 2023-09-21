import '@playwright/test';
import { BaseComponent } from '../page-factory';

exports.Body = class Body extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
