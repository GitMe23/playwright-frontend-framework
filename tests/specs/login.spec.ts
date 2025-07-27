import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { USERS, TEST_PASSWORD } from '../utils/users';

test('login with standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.goto();

  await loginPage.login(USERS.standardUser, TEST_PASSWORD!);

  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(homePage.pageWrapper).toBeVisible();

  await homePage.openMenu();
  await expect(homePage.logoutLink).toBeVisible();
  await homePage.closeMenu();

  await homePage.logout();
  await loginPage.expectLoginFormVisible();
});
