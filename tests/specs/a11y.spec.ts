import { test } from '@playwright/test';
import { expectNoCriticalOrSeriousViolations } from '../utils/a11y';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { USERS } from '../utils/users';

test.describe('WCAG 2A Accessibility Tests', () => {

  test('home page', 
    { tag: ['@expected failure', '@xfail', '@a11y', '@home', '@EPIC-9999', '@STORY-9001'] }, 
    async ({ page }, testInfo) => {

      testInfo.annotations.push({ type: 'jiraEpic', description: 'EPIC-9999' });
      testInfo.annotations.push({ type: 'jiraStory', description: 'STORY-9001 AC1' });
      testInfo.annotations.push({ type: 'user', description: USERS.standardUser });

      // 🔸 expected to fail
      testInfo.expectedStatus = 'failed';

      const homePage = new HomePage(page);
      await homePage.login(USERS.standardUser);
      await expectNoCriticalOrSeriousViolations(homePage.page);
  });

  test('login page', 
    { tag: ['@a11y', '@login', '@EPIC-9999', '@STORY-9002'] }, 
    async ({ page }, testInfo) => {

      testInfo.annotations.push({ type: 'jiraEpic', description: 'EPIC-9999' });
      testInfo.annotations.push({ type: 'jiraStory', description: 'STORY-9002 AC1' });

      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await expectNoCriticalOrSeriousViolations(loginPage.page);
  });

});
