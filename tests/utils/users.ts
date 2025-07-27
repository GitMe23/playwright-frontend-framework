export const USERS = {
    standardUser: process.env.STANDARD_USER || 'standard_user',
    lockedOutUser: process.env.LOCKED_OUT_USER || 'locked_out_user',
    problemUser: process.env.PROBLEM_USER || 'problem_user',
    performanceGlitchUser: process.env.PERFORMANCE_GLITCH_USER || 'performance_glitch_user',
  };
  
  // Export password separately
  export const TEST_PASSWORD = process.env.TEST_PASSWORD;
  