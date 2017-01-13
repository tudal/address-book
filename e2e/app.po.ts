import { browser, element, by } from 'protractor';

export class AdressBookPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ab-root h1')).getText();
  }
}
