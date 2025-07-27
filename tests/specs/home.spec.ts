// tests/home.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../utils/users';

test.describe('EPIC-1234 Home Page Authentication Tests', () => {
  /**
   * @jiraEpic EPIC-1234
   * @jiraStory STORY-5678
   * @tags home, smoke, STORY-5678
   */

  // Using test steps for Given, When, Then to use Playwright test runner over Cucumber
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.login(USERS.standardUser);
  });

  test('STORY-5678 AC1: standard user can see inventory', 
    { tag: ['@home', '@smoke', '@EPIC-1234', '@STORY-5678'] }, 
    async ({ page }, testInfo) => {

        testInfo.annotations.push({ type: 'jiraEpic', description: 'EPIC-1234' });
        testInfo.annotations.push({ type: 'jiraStory', description: 'STORY-5678 AC1' });
        testInfo.annotations.push({ type: 'user', description: USERS.standardUser });

        const homePage = new HomePage(page);

        await test.step('Given I navigate to the home page', async () => {
            await homePage.expectOnInventoryPage();
        });

        await test.step('Then I should see the inventory content', async () => {
            await expect(homePage.pageWrapper).toBeVisible();
        });
  });

  test('STORY-5678 AC2: user can open menu and log out', 
    { tag: ['@home', '@smoke', '@EPIC-1234', '@STORY-5678'] }, 
    async ({ page }, testInfo) => {

        testInfo.annotations.push({ type: 'jiraEpic', description: 'EPIC-1234' });
        testInfo.annotations.push({ type: 'jiraStory', description: 'STORY-5678 AC2' });
        testInfo.annotations.push({ type: 'user', description: USERS.standardUser });

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
    
        await test.step('Given I am on the inventory page', async () => {
        await homePage.expectOnInventoryPage();
        });
    
        await test.step('When I click the logout link', async () => {
        await homePage.logout();
        });
    
        await test.step('Then I should see the login page', async () => {
        await loginPage.expectLoginFormVisible();
        });
  });
  
});
