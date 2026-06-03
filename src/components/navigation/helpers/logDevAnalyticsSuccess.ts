export type EventParams = Record<string, string | number | boolean>;

export const logDevAnalyticsSuccess = (
  eventType: string,
  params?: EventParams,
) =>
  console.log(
    `🔥 Sending analytics successful - [${eventType}]:`,
    params || '{}',
  );
