export async function getCurrentTab(): Promise<chrome.tabs.Tab> {
  const queryOptions: chrome.tabs.QueryInfo = {
    active: true,
    currentWindow: true,
  };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
