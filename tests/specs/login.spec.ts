import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { USERS, TEST_PASSWORD } from '../utils/users';

test.describe('EPIC-9876 Home Page Authentication', () => {
  /**
   * @jiraEpic EPIC-9876
   * @jiraStory STORY-4321
   * @tags auth, smoke, home-page
   */

  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
    
    
  });

  test('STORY-4321 AC1: standard user can log in and out', 
  { tag: ['@auth', '@smoke', '@EPIC-9876', '@STORY-4321'] }, 
  async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'jiraEpic', description: 'EPIC-9876' });
    testInfo.annotations.push({ type: 'jiraStory', description: 'STORY-4321' });
    testInfo.annotations.push({ type: 'user', description: USERS.standardUser });

    await test.step('Given I log in with valid credentials', async () => {
        await loginPage.login(USERS.standardUser, TEST_PASSWORD!);
      });

    await test.step('Then I should see the inventory page', async () => {
        await homePage.expectOnInventoryPage();
      });

  });
});
