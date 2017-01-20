import { MovieappPage } from './app.po';

describe('movieapp App', function() {
  let page: MovieappPage;

  beforeEach(() => {
    page = new MovieappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
