import { firstValueFrom } from 'rxjs';
import { atService } from '../shared/at/at.service';
import { getQueryParams } from '../shared/utils';
import { getCurrentTab } from './utils';

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup')
    port.onDisconnect.addListener(() => chrome.runtime.reload());
});

init();

function init(): void {
  chrome.webRequest.onCompleted.removeListener(handleAtRequest);
  chrome.webRequest.onCompleted.addListener(handleAtRequest, {
    urls: ['https://www.google.com/search*'],
  });
}

async function handleAtRequest(
  details: chrome.webRequest.WebResponseCacheDetails
): Promise<void> {
  const _ats = await firstValueFrom(atService.ats$);
  const _searchParam = getQueryParams(details.url)['q'];
  const _input = _searchParam.split('+');
  const _candidateAbbr = _input.pop();

  if (!_candidateAbbr?.startsWith('@')) return;

  const _abbreviations = _candidateAbbr.split('@').filter((abbr) => !!abbr);

  const _enteredAts = _abbreviations
    .filter(
      (abbr) =>
        !!_ats.find(
          (at) => at.abbreviation === abbr.replace('#', '') && at.isActive
        )
    )
    .map((abbr) => {
      const at = _ats.find((at) => at.abbreviation === abbr.replace('#', ''))!;
      return { ...at, isIncognito: abbr.includes('#') };
    });

  if (_enteredAts.length === 0) return;

  const currTab = await getCurrentTab();

  if (!currTab?.id) return;

  const _incognitoUrls = _enteredAts
    .filter((enteredAt) => enteredAt.isIncognito)
    .map((enteredAt) =>
      atService.getSearchUrl(
        _ats.find((at) => at.abbreviation === enteredAt.abbreviation)!,
        _input.join(' ')
      )
    );

  const _normalUrls = _enteredAts
    .filter((enteredAt) => !enteredAt.isIncognito)
    .map((enteredAt) =>
      atService.getSearchUrl(
        _ats.find((at) => at.abbreviation === enteredAt.abbreviation)!,
        _input.join(' ')
      )
    );

  _normalUrls.forEach((url) =>
    chrome.tabs.create({
      url,
    })
  );

  if (_incognitoUrls.length > 0) {
    chrome.windows.create({
      url: _incognitoUrls,
      incognito: true,
    });

    chrome.history.deleteUrl({ url: details.url });
  }

  chrome.tabs.remove(currTab.id);
}
