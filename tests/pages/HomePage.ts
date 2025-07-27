// pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { USERS, TEST_PASSWORD } from '../utils/users';

export class HomePage {
  readonly page: Page;

  // Sidebar menu container and overlay
  readonly menuOverlay: Locator;
  readonly menuWrap: Locator;

  // Menu buttons
  readonly menuOpenButton: Locator;
  readonly menuCloseButton: Locator;

  // Sidebar links
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  // Page wrapper div
  readonly pageWrapper: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuOverlay = page.locator('.bm-overlay');
    this.menuWrap = page.locator('.bm-menu-wrap');
    this.menuOpenButton = page.locator('.bm-burger-button');
    this.menuCloseButton = page.locator('.bm-cross-button button');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.pageWrapper = page.locator('#page_wrapper');
  }

  /**
 * Logs in to the application.
 * Overiding function:
 * If a username is provided, performs login via the LoginPage.
 * If no username is provided, assumes the user is already logged in
 * and navigates directly to the home (inventory) page.
 *
 * @param {string} [user] - Optional username to login with.
 */
  async login(user?: string) {
    if (user) {
      const loginPage = new LoginPage(this.page);
      await loginPage.goto();
      await loginPage.login(user, TEST_PASSWORD!);
      // wait for page to load after login, check url or element
      await expect(this.page).toHaveURL(/.*inventory.html/);
      await expect(this.pageWrapper).toBeVisible();
    } else {
      // no user: assume already logged in, just go to home page directly
      await this.page.goto('/inventory.html');
      await expect(this.pageWrapper).toBeVisible();
    }
  }

  async openMenu() {
    await this.menuOpenButton.waitFor({ state: 'visible' });
    await this.menuOpenButton.click();
  }

  async closeMenu() {
    await this.menuCloseButton.click();
    await this.menuOverlay.waitFor({ state: 'hidden' });
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.closeMenu();
  }

  async expectOnInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }


}
