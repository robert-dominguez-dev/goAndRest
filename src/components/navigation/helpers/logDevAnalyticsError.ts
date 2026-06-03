export const logDevAnalyticsError = (eventType: string, error: unknown) =>
  console.error(`❌ Sending analytics failed - [${eventType}]:`, error);
