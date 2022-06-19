import { Browser, chromium, Page } from 'playwright';

describe('smoke test on page', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/', {
      waitUntil: 'domcontentloaded',
    });
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('contains "Logs Generator"', async () => {
    await page.waitForSelector('#root nav.nav-tabs');
    const tabs = await page.locator('#root nav.nav-tabs a').allInnerTexts();
    await expect(tabs).toContain('Logs Generator');
  });

  it('contains "Table of Contents Generator"', async () => {
    await page.waitForSelector('#root nav.nav-tabs');
    const tabs = await page.locator('#root nav.nav-tabs a').allInnerTexts();
    await expect(tabs).toContain('Table of Contents Generator');
  });
});
