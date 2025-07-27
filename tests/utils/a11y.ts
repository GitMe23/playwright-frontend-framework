import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function expectNoCriticalOrSeriousViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  if (results.violations.length > 0) {
    console.log('Accessibility violations found:');
    for (const violation of results.violations) {
      console.log(`- [${violation.id}] ${violation.help} (Impact: ${violation.impact})`);
      violation.nodes.forEach((node, index) => {
        console.log(`  Node ${index + 1}:`);
        console.log(`    Target: ${node.target.join(', ')}`);
        console.log(`    HTML: ${node.html}`);
        console.log(`    Failure Summary: ${node.failureSummary}`);
      });
    }

    // Fail only on critical or serious impact violations
    const failViolations = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    );

    expect(failViolations.length, 'Critical or serious accessibility violations found').toBe(0);
  } else {
    console.log('No accessibility violations found.');
  }
}
