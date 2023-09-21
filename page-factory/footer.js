import '@playwright/test';
import { BaseComponent } from '../page-factory';

exports.Footer = class Footer extends BaseComponent {
    constructor({ page, locator}) {
        super({page, locator});
      }
}
