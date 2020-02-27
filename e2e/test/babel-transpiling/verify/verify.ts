import { expectMetricsResult, produceMetrics } from '../../../helpers';

describe('Verify stryker has ran correctly', () => {

  it('should report expected score', async () => {
    // File       | % score | # killed | # timeout | # survived | # no cov | # error |
    // All files  |   58.54 |       24 |         0 |         17 |        0 |       1 |
    await expectMetricsResult({
      metrics: produceMetrics({
        killed: 24,
        mutationScore: 53.33,
        mutationScoreBasedOnCoveredCode: 53.33,
        runtimeErrors: 2,
        survived: 21,
        totalCovered: 45,
        totalDetected: 24,
        totalInvalid: 2,
        totalMutants: 47,
        totalUndetected: 21,
        totalValid: 45
      })
    });
  });
});
