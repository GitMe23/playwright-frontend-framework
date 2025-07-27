import { Locator, Page } from '@playwright/test';

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

    // Menu overlay that covers the page when menu is open
    this.menuOverlay = page.locator('.bm-overlay');

    // Sidebar menu wrapper
    this.menuWrap = page.locator('.bm-menu-wrap');

    // The burger menu button to open the sidebar
    this.menuOpenButton = page.locator('.bm-burger-button');

    // The close button inside the menu (the "X" button)
    this.menuCloseButton = page.locator('.bm-cross-button button');

    // Sidebar navigation links
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');

    // Main page wrapper
    this.pageWrapper = page.locator('#page_wrapper');
  }

  async openMenu() {
    await this.menuOpenButton.waitFor({ state: 'visible' });
    await this.menuOpenButton.click();
    console.log('Clicked menu button');
    
  }
  

  async closeMenu() {
    await this.menuCloseButton.click();
    // wait for menu overlay or menu to be hidden
    await this.menuOverlay.waitFor({ state: 'hidden' });
  }

  async navigateToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
    await this.closeMenu();
  }

  async navigateToAbout() {
    await this.openMenu();
    await this.aboutLink.click();
    await this.closeMenu();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
    await this.closeMenu();
  }
}
