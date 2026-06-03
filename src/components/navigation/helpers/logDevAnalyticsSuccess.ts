export const logDevAnalyticsSuccess = (
  eventType: string,
  params?: Record<string, string>,
) =>
  console.log(
    `🔥 Sending analytics successful - [${eventType}]:`,
    params || '{}',
  );
