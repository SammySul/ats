export function getQueryParams(url: string): Record<string, string> {
  const queryParams: Record<string, string> = {};
  const queryString = url.split('?')[1];

  if (!queryString) return queryParams;

  queryString.split('&').forEach((param) => {
    const [key, value] = param.split('=');
    if (key && value)
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return queryParams;
}
