import '@playwright/test';
import { BaseComponent } from '../page-factory';

exports.List = class List extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
