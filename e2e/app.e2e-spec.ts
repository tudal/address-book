import { AdressBookPage } from './app.po';

describe('adress-book App', function() {
  let page: AdressBookPage;

  beforeEach(() => {
    page = new AdressBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ab works!');
  });
});
