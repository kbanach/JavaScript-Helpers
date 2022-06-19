import { test, expect } from '@playwright/test';

test('basic smoke test', async ({ page }) => {
  await page.goto('https://kbanach.github.io/JavaScript-Helpers/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#root nav.nav-tabs');
  const tabs = page.locator('#root nav.nav-tabs a:nth-child(1)');
  await expect(tabs).toHaveText('Logs Generator');
});